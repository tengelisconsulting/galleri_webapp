import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as db from "../../../types/auto/db";
type user_image = db.OpenAPI2.user_image;
type user_image_collection = db.OpenAPI2.user_image_collection;

import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { WindowService } from 'src/app/ui/window.service';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { ImageDataService } from 'src/app/core/data/image-data.service';
import { BehaviorSubject, Observable, merge, timer } from 'rxjs';
import { take, filter, map, takeUntil } from 'rxjs/operators';


interface FullImage extends user_image {
  full_url: string;
}

@Component({
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayComponent extends BaseComponent {

  public readonly EDIT_ROUTE_LINK: string = `/${AppRoutePath.APP_PREFIX}/${AppRoutePath.EDIT_IMAGE_COLLECTION}` ;
  private readonly IMAGE_LOAD_DELAY_MS: number = 500;

  @Input()
  public collectionId: string;

  public images: FullImage[] = [];

  public collection: user_image_collection;

  public windowHeight: number;
  public windowWidth: number;

  public loaded$: BehaviorSubject<{[index: string]: boolean}> = new BehaviorSubject({});

  constructor(
    private cdr: ChangeDetectorRef,
    private imageDataService: ImageDataService,
    private windowService: WindowService,
  ) {
    super();
    this.appOnInit(() => {
      this.loadImages();
      this.loadCollection();
      this.windowService.getResizeStream(this.isDestroyed$, 1000)
        .pipe(take(1))
        .subscribe((size) => {
          this.windowHeight = size.height;
          this.windowWidth = size.width;
          this.cdr.detectChanges();
        })
    });
  }

  public async loadImages(): Promise<void> {
    const images = await this.imageDataService
      .getImagesForCollection(this.collectionId);
    this.images = images.map((im: any) => {
      im.full_url = "";
      return im as FullImage;
    });
    const fullUrls = await Promise.all(
      images.map((im) => this.imageDataService.getFullImageUrl(im.image_id))
    );
    this.loadFullUrls(fullUrls);
  }

  public imageLoaded(index: number): void {
    const newState = {};
    Object.assign(newState, this.loaded$.value);
    newState[index.toString()] = true;
    this.loaded$.next(newState);
  }

  public async loadCollection(): Promise<void> {
    this.collection = await this.imageDataService
      .getCollection(this.collectionId);
    this.cdr.detectChanges();
  }

  private loadFullUrls(fullUrls: string[]): void {
    // we wait for the sooner of:
    // 1) IMAGE_LOAD_DELAY_MS * index of the photo
    // 2) the previous image to load
    const loadUrl = (index: number) => {
      console.log("loading image:", index);
      this.images[index].full_url = fullUrls[index];
      this.cdr.detectChanges();
    }
    loadUrl(0);
    const waitStreams: Observable<boolean>[] = [
      ...Array(fullUrls.length).keys()
    ].map((index) => merge(
      this.loaded$.pipe(
        filter((state) => state[(index - 1).toString()]),
      ),
      timer(this.IMAGE_LOAD_DELAY_MS * index),
    ).pipe(
      take(1),
      map((_) => true),
      takeUntil(this.isDestroyed$)
    ));
    waitStreams.forEach((wait$, index) => {
      wait$.pipe(take(1))
        .subscribe(() => loadUrl(index));
    });
  }

}

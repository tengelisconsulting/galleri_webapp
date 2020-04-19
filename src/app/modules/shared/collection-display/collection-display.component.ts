import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';

import { HttpService } from 'src/app/core/http.service';

import * as db from "../../../types/auto/db";
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { WindowService } from 'src/app/ui/window.service';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
type user_image = db.OpenAPI2.user_image;
type user_image_collection = db.OpenAPI2.user_image_collection;


@Component({
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayComponent extends BaseComponent {

  public EDIT_ROUTE_LINK: string = `/${AppRoutePath.APP_PREFIX}/${AppRoutePath.EDIT_IMAGE_COLLECTION}` ;

  @Input()
  public collectionId: string;

  public images: user_image[] = [];

  public collection: user_image_collection;

  public windowHeight: number;
  public windowWidth: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private httpService: HttpService,
    private windowService: WindowService,
  ) {
    super();
    this.appOnInit(() => {
      this.loadImages();
      this.loadCollection();
      this.windowService.getResizeStream(this.isDestroyed$, 1000)
        .subscribe((size) => {
          this.windowHeight = size.height;
          this.windowWidth = size.width;
          this.cdr.detectChanges();
        })
    });
  }

  public async loadImages(): Promise<void> {
    // you can load all the hrefs at once,
    // but put them into the DOM in a staggered fashion,
    // so that you don't try to load all of them from s3
    // at the same time
    const url = `/db/user_image?collection_id=eq.${this.collectionId}`;
    const res = await this.httpService.getReq({path: url});
    this.images = await res.json();
    this.cdr.detectChanges();
  }

  public async loadCollection(): Promise<void> {
    const url = `/db/user_image_collection?collection_id=eq.${this.collectionId}`;
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    this.collection = data[0];
    this.cdr.detectChanges();
  }

}

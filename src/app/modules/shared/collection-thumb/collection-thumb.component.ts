import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { ImageDataService } from 'src/app/core/data/image-data.service';

import * as db from "../../../types/auto/db";
import { SessionService } from 'src/app/core/session.service';
type user_image_collection = db.OpenAPI2.user_image_collection;


@Component({
  selector: 'app-collection-thumb',
  templateUrl: './collection-thumb.component.html',
  styleUrls: ['./collection-thumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionThumbComponent {

  @Input()
  private id: string;

  public imageUrl: string;

  public collection: user_image_collection;

  constructor(
    private cdr: ChangeDetectorRef,
    private imageDataService: ImageDataService,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  public ngOnInit(): void {
    this.imageUrl = `/db/user_collection_thumb?collection_id=eq.${this.id}&select=thumb`;
    this.loadCollection();
  }

  public navToCollection(): void {
    const getAppRoute = () => {
      if (this.sessionService.getUserId() === this.collection.user_id) {
        return AppRoutePath.YOUR_IMAGE_COLLECTION;
      }
      return AppRoutePath.IMAGE_COLLECTION;
    }
    this.router.navigate([
      AppRoutePath.APP_PREFIX, getAppRoute()
    ], {
      queryParams: {
        collectionId: this.id,
      }
    });
  }

  private async loadCollection(): Promise<void> {
    this.collection = await this.imageDataService.getCollection(this.id);
    this.cdr.detectChanges();
  }

}

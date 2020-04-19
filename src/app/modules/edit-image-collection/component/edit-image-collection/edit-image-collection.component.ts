import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';

import * as db from "../../../../types/auto/db";
type user_image = db.OpenAPI2.user_image;
type user_image_collection = db.OpenAPI2.user_image_collection;

import { ImageDataService } from 'src/app/core/data/image-data.service';


@Component({
  selector: 'app-edit-image-collection',
  templateUrl: './edit-image-collection.component.html',
  styleUrls: ['./edit-image-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageCollectionComponent extends BaseComponent {

  @Input()
  private collectionId: string;

  public images: user_image[] = [];

  public collection: user_image_collection;

  constructor(
    private cdr: ChangeDetectorRef,
    private imageDataService: ImageDataService,
  ) {
    super();
  }

  public async loadImages(): Promise<void> {
    this.images = await this.imageDataService
      .getImagesForCollection(this.collectionId);
    this.cdr.detectChanges();
  }

  public async loadCollection(): Promise<void> {
    this.collection = await this.imageDataService
      .getCollection(this.collectionId);
    this.cdr.detectChanges();
  }

}

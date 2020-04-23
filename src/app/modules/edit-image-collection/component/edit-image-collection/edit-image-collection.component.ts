import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';

import * as db from "../../../../types/auto/db";
type user_image = db.OpenAPI2.user_image;
type user_image_collection = db.OpenAPI2.user_image_collection;

import { ImageDataService } from 'src/app/core/data/image-data.service';
import { WindowService } from 'src/app/ui/window.service';
import { ModalService } from 'src/app/ui/modal.service';
import { EditImageDescModalComponent } from '../edit-image-desc-modal/edit-image-desc-modal.component';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-edit-image-collection',
  templateUrl: './edit-image-collection.component.html',
  styleUrls: ['./edit-image-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageCollectionComponent extends BaseComponent {


  @Input()
  public collectionId: string;

  public readonly origCollectionLink = [
    `/${AppRoutePath.APP_PREFIX}/${AppRoutePath.IMAGE_COLLECTION}`
  ];

  public images: user_image[] = [];

  public collection: user_image_collection;
  public thumbSizePx: number;

  public toUpload: File[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private imageDataService: ImageDataService,
    private modalService: ModalService,
    private windowService: WindowService,
  ) {
    super();
    this.appOnInit(() => {
      this.loadCollection();
      this.loadImages();
      this.windowService.getResizeStream(this.isDestroyed$, 500)
        .subscribe((size) => this.setThumbSize(size.width));
    });
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

  public onNewImage(f: File): void {
    this.toUpload = this.toUpload.concat(f);
    this.cdr.detectChanges();
  }

  public async imageAdded(
    uploadIndex: number,
    imageId: string
  ): Promise<void> {
    this.uploadFinished(uploadIndex);
    const addSuccess = await this.imageDataService
      .addImageToCollection(imageId, this.collectionId);
    if (!addSuccess) {
      console.error("failed to add image");
      return;
    }
    this.loadImages();
  }

  public uploadFinished(index: number): void {
    this.toUpload = Array.prototype.concat(
      this.toUpload.slice(0, index), this.toUpload.slice(index + 1),
    );
  }

  public editImageDesc(imageId: string): void {
    this.modalService.showModal({
      component: EditImageDescModalComponent,
      initParams: { imageId: imageId },
    });
  }

  public imageDrop(event: CdkDragDrop<string[]>): void {
    console.log("event:", event);
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    this.cdr.detectChanges();
  }

  private setThumbSize(windowWidth: number): void {
    this.thumbSizePx = (windowWidth - 20) / 3 - 20;
    this.cdr.detectChanges();
  }

}

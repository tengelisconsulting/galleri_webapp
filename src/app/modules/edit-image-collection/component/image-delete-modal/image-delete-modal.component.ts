import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from 'src/app/types/ModalComponent';


@Component({
  selector: 'app-image-delete-modal',
  templateUrl: './image-delete-modal.component.html',
  styleUrls: ['./image-delete-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDeleteModalComponent extends ModalComponent<{
  collectionId: string;
  imageId: string;
}, boolean> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

}

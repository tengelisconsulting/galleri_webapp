import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from 'src/app/types/ModalComponent';

interface InitParams {
  imageId: string;
}

@Component({
  selector: 'app-edit-image-desc-modal',
  templateUrl: './edit-image-desc-modal.component.html',
  styleUrls: ['./edit-image-desc-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageDescModalComponent extends ModalComponent<InitParams> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

}

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from 'src/app/types/ModalComponent';

@Component({
  selector: 'app-create-collection-modal',
  templateUrl: './create-collection-modal.component.html',
  styleUrls: ['./create-collection-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionModalComponent extends ModalComponent<void, boolean> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

}

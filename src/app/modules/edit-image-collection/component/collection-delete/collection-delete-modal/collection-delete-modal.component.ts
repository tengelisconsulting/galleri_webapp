import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from 'src/app/types/ModalComponent';

@Component({
  selector: 'app-collection-delete-modal',
  templateUrl: './collection-delete-modal.component.html',
  styleUrls: ['./collection-delete-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionDeleteModalComponent extends ModalComponent<{
  collectionId: string;
}, boolean> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

}

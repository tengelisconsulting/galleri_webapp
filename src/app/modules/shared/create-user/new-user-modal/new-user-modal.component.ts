import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from 'src/app/types/ModalComponent';


@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserModalComponent extends ModalComponent<void, boolean> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

}

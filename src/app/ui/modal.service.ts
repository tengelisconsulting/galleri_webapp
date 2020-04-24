import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalInit } from '../types/ModalInit';
import { BaseModalComponent } from './components/base-modal/base-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private dialogRef: any;

  constructor(
    private dialog: MatDialog,
  ) { }

  public showModal(
    init: ModalInit,
  ): Promise<any> {
    return new Promise((resolve, _reject) => {
      this.dialogRef = this.dialog.open(BaseModalComponent, {
        width: "50%",
        data: {
          modalInit: init,
          resolver: (res: any) => resolve(res),
        },
      });
    });
  }

  public hideModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}

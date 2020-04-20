import { BaseComponent } from '../core/framework/component/BaseComponent';
import { ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { ModalService } from '../ui/modal.service';


export class ModalComponent<T> extends BaseComponent {

  public params: T;

  constructor(
    protected cdr?: ChangeDetectorRef,
  ) {
    super();
  }

  public modalInit(params: T): void {
    this.params = params;
    this.cdr.detectChanges();
  }

  public closeModal(): void {
    AppComponent.injector.get(ModalService).hideModal();
  }
}

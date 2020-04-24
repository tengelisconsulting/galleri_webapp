import { BaseComponent } from '../core/framework/component/BaseComponent';
import { ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { ModalService } from '../ui/modal.service';


export class ModalComponent<T, R> extends BaseComponent {

  public params: T;

  private resolver: (result: R) => void;

  constructor(
    protected cdr: ChangeDetectorRef,
  ) {
    super();
  }

  public modalInit(
    params: T,
    resolver: (result: R) => void
  ): void {
    this.params = params;
    this.resolver = resolver;
    this.cdr.detectChanges();
  }

  public closeModal(result: R): void {
    console.log("closed with", result);
    AppComponent.injector.get(ModalService).hideModal();
    this.resolver(result);
  }
}

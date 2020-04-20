import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { ModalInit } from 'src/app/types/ModalInit';
import { filter } from 'rxjs/operators';
import { ModalComponent } from 'src/app/types/ModalComponent';

@Component({
  selector: 'app-modal-anchor-proto',
  templateUrl: './modal-anchor-proto.component.html',
  styleUrls: ['./modal-anchor-proto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAnchorProtoComponent extends BaseComponent {

  @ViewChild("container", {
    read: ViewContainerRef,
    static: true
  })
  private container: any;
  private componentRef: ComponentRef<any>;

  constructor(
    private cfr: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private modalService: ModalService,
  ) {
    super();
    this.appOnInit(() => {
      this.modalService.getActiveModal$(this.isDestroyed$)
        .pipe(filter((modalInit) => !!modalInit))
        .subscribe((modalInit) => this.loadModal(modalInit));
    });
  }

  private loadModal(modalInit: ModalInit): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    const factory = this.cfr.resolveComponentFactory(
      modalInit.component
    );
    this.componentRef = this.container.createComponent(factory);
    if (modalInit.initParams) {
      const instance: ModalComponent<any> = this.componentRef.instance;
      instance.modalInit(modalInit.initParams);
    }
    this.cdr.detectChanges();
  }

}

import { Component, ChangeDetectionStrategy, Inject, ComponentFactoryResolver, ChangeDetectorRef, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalInit } from 'src/app/types/ModalInit';
import { ModalComponent } from 'src/app/types/ModalComponent';


interface InputParams {
  modalInit: ModalInit;
  resolver: (result: any) => void;
}

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseModalComponent implements AfterViewInit {

  @ViewChild("container", {
    read: ViewContainerRef,
    static: true
  })
  private container: any;
  private componentRef: ComponentRef<any>;


  constructor(
    private cfr: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<BaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public input: InputParams,
  ) {
  }

  public ngAfterViewInit() {
    this.loadModal(this.input);
  }



  private loadModal(input: InputParams): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    const factory = this.cfr.resolveComponentFactory(
      input.modalInit.component
    );
    this.componentRef = this.container.createComponent(factory);
    const instance: ModalComponent<any, any> = this.componentRef.instance;
    instance.modalInit(input.modalInit.initParams, input.resolver);
    this.cdr.detectChanges();
  }
}

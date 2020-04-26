import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { ModalService } from 'src/app/ui/modal.service';
import { CreateCollectionModalComponent } from 'src/app/modules/shared/create-collection-modal/create-collection-modal.component';


@Component({
  selector: 'app-your-gallery-route',
  templateUrl: './your-gallery-route.component.html',
  styleUrls: ['./your-gallery-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourGalleryRouteComponent extends RouteComponent<void> {

  constructor(
    cdr: ChangeDetectorRef,
    private modalService: ModalService,
  ) {
    super(cdr);
  }

  public openCreateCollectionModal(): void {
    this.modalService.showModal({
      component: CreateCollectionModalComponent,
    });
  }
}

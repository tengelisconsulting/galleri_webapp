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

  public showAllPieces: boolean = true;

  constructor(
    cdr: ChangeDetectorRef,
    private modalService: ModalService,
  ) {
    super(cdr);
  }

  public async openCreateCollectionModal(): Promise<void> {
    const newCollection = await this.modalService.showModal({
      component: CreateCollectionModalComponent,
    });
    if (newCollection) {
      this.showAllPieces = false;
      this.cdr.detectChanges();
      this.showAllPieces = true;
      this.cdr.detectChanges();
    }
  }
}

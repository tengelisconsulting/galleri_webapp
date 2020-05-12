import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { ModalService } from 'src/app/ui/modal.service';
import { CreateCollectionModalComponent } from 'src/app/modules/shared/create-collection-modal/create-collection-modal.component';
import { Router } from '@angular/router';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';


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
    private router: Router,
  ) {
    super(cdr);
  }

  public async openCreateCollectionModal(): Promise<void> {
    const newCollectionId: string = await this.modalService.showModal({
      component: CreateCollectionModalComponent,
    });
    if (newCollectionId) {
      this.router.navigate([
        AppRoutePath.APP_PREFIX, AppRoutePath.YOUR_IMAGE_COLLECTION
      ], {
        queryParams: {
          collectionId: newCollectionId,
        }
      })
    }
  }
}

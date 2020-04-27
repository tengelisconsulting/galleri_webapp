import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/ui/modal.service';
import { CollectionDeleteModalComponent } from 'src/app/modules/edit-image-collection/component/collection-delete/collection-delete-modal/collection-delete-modal.component';

@Component({
  selector: 'app-your-image-collection-route',
  templateUrl: './your-image-collection-route.component.html',
  styleUrls: ['./your-image-collection-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourImageCollectionRouteComponent extends RouteComponent<{
  collectionId: string;
}> {

  constructor(
    cdr: ChangeDetectorRef,
    private modalService: ModalService,
    private router: Router,
  ) {
    super(cdr);
  }

  public editCollection(): void {
    this.router.navigate([
      AppRoutePath.APP_PREFIX, AppRoutePath.EDIT_IMAGE_COLLECTION
    ], {
      queryParams: {
        collectionId: this.params.collectionId,
      }
    });
  }

  public async confirmDeleteCollection(): Promise<void> {
    const wasDeleted = await this.modalService.showModal({
      component: CollectionDeleteModalComponent,
      initParams: {
        collectionId: this.params.collectionId,
      },
    });
    if (wasDeleted) {
      this.router.navigate([
        AppRoutePath.APP_PREFIX, AppRoutePath.YOUR_GALLERY
      ]);
    }
  }

}

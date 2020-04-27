import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { ModalService } from 'src/app/ui/modal.service';
import { CollectionDeleteModalComponent } from '../collection-delete/collection-delete-modal/collection-delete-modal.component';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';


@Component({
  selector: 'app-edit-image-collection-route',
  templateUrl: './edit-image-collection-route.component.html',
  styleUrls: ['./edit-image-collection-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageCollectionRouteComponent extends RouteComponent<{
  collectionId: string;
}> {

  public collectionId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
    this.appOnInit(() => {
      this.activatedRoute.queryParams.pipe(
        takeUntil(this.isDestroyed$)
      ).subscribe((params) => {
        this.collectionId = params.collectionId;
        this.cdr.detectChanges();
      });
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

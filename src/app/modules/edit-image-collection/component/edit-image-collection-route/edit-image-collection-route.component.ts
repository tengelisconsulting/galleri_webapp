import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';


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

}

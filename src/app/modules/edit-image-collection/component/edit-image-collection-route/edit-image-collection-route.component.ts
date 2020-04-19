import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-edit-image-collection-route',
  templateUrl: './edit-image-collection-route.component.html',
  styleUrls: ['./edit-image-collection-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageCollectionRouteComponent extends BaseComponent {

  public collectionId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    super();
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

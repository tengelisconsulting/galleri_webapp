import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { takeUntil, take } from 'rxjs/operators';


@Component({
  selector: 'app-image-collection-route',
  templateUrl: './image-collection-route.component.html',
  styleUrls: ['./image-collection-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCollectionRouteComponent extends BaseComponent {

  public collectionId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    super();
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe((params) => {
      this.collectionId = params.collectionId;
    });
  }

}

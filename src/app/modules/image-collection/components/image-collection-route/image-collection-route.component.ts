import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { RouteComponent } from 'src/app/core/routing/RouteComponent';


@Component({
  selector: 'app-image-collection-route',
  templateUrl: './image-collection-route.component.html',
  styleUrls: ['./image-collection-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCollectionRouteComponent extends RouteComponent<{
  collectionId: string;
}> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

}

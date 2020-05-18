import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';


@Component({
  selector: 'app-anon-gallery-view-route',
  templateUrl: './anon-gallery-view-route.component.html',
  styleUrls: ['./anon-gallery-view-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonGalleryViewRouteComponent extends RouteComponent<{
  collectionId: string,
  accessToken: string,
}> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
    this.appOnInit(() => {
      console.log("params: ", this.params);
    });
  }

}

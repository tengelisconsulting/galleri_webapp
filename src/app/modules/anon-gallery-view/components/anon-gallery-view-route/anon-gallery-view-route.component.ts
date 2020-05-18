import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { SessionService } from 'src/app/core/session.service';


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

  public sessionLoaded: boolean = false;

  constructor(
    cdr: ChangeDetectorRef,
    private sessionService: SessionService,
  ) {
    super(cdr);
    this.appOnInit(() => {
      this.sessionService.enterSession(null, this.params.accessToken);
      this.sessionLoaded = true;
      this.cdr.detectChanges();
    });
  }

}

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { SessionService } from 'src/app/core/session.service';
import { AppLoadService } from 'src/app/core/app-load.service';
import { ModalService } from 'src/app/ui/modal.service';
import { NewUserModalComponent } from 'src/app/modules/shared/create-user/new-user-modal/new-user-modal.component';


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
  public expires: Date;

  constructor(
    cdr: ChangeDetectorRef,
    private appLoad: AppLoadService,
    private modalService: ModalService,
    private sessionService: SessionService,
  ) {
    super(cdr);
    this.appOnInit(() => {
      this.sessionService.enterSession(null, this.params.accessToken);
      this.sessionLoaded = true;
      const claimsData = JSON.parse(atob(this.params.accessToken));
      this.expires = new Date(claimsData.body.exp_ts * 1000);
      this.cdr.detectChanges();
    });
  }

  public async newUserModal(): Promise<void> {
    const createRes = await this.modalService.showModal({
      component: NewUserModalComponent,
    });
    if (createRes) {
      await this.appLoad.startupFromLogin(
        createRes.username, createRes.password
      );
    }
  }

}

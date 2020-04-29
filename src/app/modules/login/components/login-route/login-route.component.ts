import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { NewUserModalComponent } from 'src/app/modules/shared/create-user/new-user-modal/new-user-modal.component';
import { AppLoadService } from 'src/app/core/app-load.service';


@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRouteComponent {

  constructor(
    private appLoad: AppLoadService,
    private modalService: ModalService,
  ) { }

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

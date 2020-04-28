import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { NewUserModalComponent } from 'src/app/modules/shared/create-user/new-user-modal/new-user-modal.component';


@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRouteComponent {

  constructor(
    private modalService: ModalService,
  ) { }

  public async newUserModal(): Promise<void> {
    const success = await this.modalService.showModal({
      component: NewUserModalComponent,
    });
    console.log("create success", success);
  }

}

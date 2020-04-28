import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppLoadService } from 'src/app/core/app-load.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("", [
      Validators.required,
    ]),
  });

  public errorMsg: string;

  constructor(
    private appLoad: AppLoadService,
  ) { }

  public async login(): Promise<void> {
    this.errorMsg = null;
    if (!this.loginForm.valid) {
      return;
    }
    this.loginForm.disable();
    const success = await this.appLoad.startupFromLogin(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.loginForm.enable();
    if (!success) {
      this.errorMsg = "Invalid username or password";
    }
  }

}

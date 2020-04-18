import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppLoadService } from 'src/app/core/app-load.service';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-route',
  templateUrl: './login-route.component.html',
  styleUrls: ['./login-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRouteComponent {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("", [
      Validators.required,
    ]),
  });

  public errorMsg: string;

  private readonly DEFAULT_ROUTE_PATH = [
    AppRoutePath.APP_PREFIX,
    AppRoutePath.YOUR_GALLERY,
  ];

  constructor(
    private appLoad: AppLoadService,
    private router: Router,
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
    } else {
      this.router.navigate(this.DEFAULT_ROUTE_PATH);
    }
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { AppRoutePath } from './routing/AppRoutePath';


@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  private readonly DEFAULT_ROUTE_PATH = [
    AppRoutePath.APP_PREFIX,
    AppRoutePath.YOUR_GALLERY,
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
  ) {}

  public async startupAttemptOnAppLoad(): Promise<boolean> {
    const sessionToken = await this.authService.attemptRenewSession();
    if (!sessionToken) {
      console.log("failed to renew session");
      this.sessionService.exitSession();
      return false;
    }
    this.startup(sessionToken);
    if (window.location.pathname === `/${AppRoutePath.LOGIN}`) {
      this.router.navigate(this.DEFAULT_ROUTE_PATH);
    }
    return true;
  }

  public async startupFromLogin(
    username: string,
    password: string
  ): Promise<boolean> {
    const sessionToken = await this.authService.authenticate(
      username,
      password
    );
    if (!sessionToken) {
      return false;
    }
    this.startup(sessionToken);
    this.router.navigate(this.DEFAULT_ROUTE_PATH);
    return true;
  }

  private startup(
    sessionToken: string
  ): void {
    // load permissions, anything else that goes in the state session
    this.sessionService.enterSession(sessionToken, []);
  }

}

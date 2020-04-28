import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { AppRoutePath } from './routing/AppRoutePath';
import { SessionData } from '../types/SessionData';


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
    const sessionData = await this.authService.attemptRenewSession();
    if (!sessionData) {
      console.log("failed to renew session");
      this.sessionService.exitSession();
      return false;
    }
    this.startup(sessionData);
    if (window.location.pathname === `/${AppRoutePath.LOGIN}`) {
      this.router.navigate(this.DEFAULT_ROUTE_PATH);
    }
    return true;
  }

  public async startupFromLogin(
    username: string,
    password: string
  ): Promise<boolean> {
    const sessionData = await this.authService.authenticate(
      username,
      password
    );
    if (!sessionData) {
      return false;
    }
    this.startup(sessionData);
    this.router.navigate(this.DEFAULT_ROUTE_PATH);
    return true;
  }

  public async unload(): Promise<void> {
    const logoutRes = await this.authService.logout();
    if (!logoutRes.ok) {
      throw new Error("failed to logout");
    }
    this.sessionService.exitSession();
    this.router.navigate([AppRoutePath.LOGIN]);
  }

  private startup(sessionData: SessionData): void {
    // load permissions, anything else that goes in the state session
    this.sessionService.enterSession(
      sessionData.user_id, sessionData.session_token
    );
  }

}

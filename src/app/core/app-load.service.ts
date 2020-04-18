import { Injectable } from '@angular/core';

import { SessionService } from './session.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  constructor(
    private authService: AuthService,
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
    return true;
  }

  private startup(
    sessionToken: string
  ): void {
    // load permissions, anything else that goes in the state session
    this.sessionService.enterSession(sessionToken, []);
    // I believe this is where we should apply the 'route before unauthed'
  }

}

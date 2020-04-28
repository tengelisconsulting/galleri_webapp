import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { SessionData } from '../types/SessionData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
  ) { }

  public async authenticate(
    username: string,
    password: string
  ): Promise<SessionData> {
    const authRes = await this.httpService.postNoAuth({
      path: "/auth/authenticate/username-password",
      data: {
        username: username,
        password: password,
      },
    });
    if (!authRes.ok) {
      return null;
    }
    const authBody = await authRes.json();
    console.log("authentication success, auth response: ", authBody);
    return authBody;
  }

  public async logout(): Promise<Response> {
    return this.httpService.postReq({
      path: "/auth/end-session",
    });
  }

  public async attemptRenewSession(): Promise<SessionData> {
    const res = await this.httpService.postNoAuth({
      path: "/auth/renew-session",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    console.log("session renew success, auth response: ", data);
    return data
  }

}

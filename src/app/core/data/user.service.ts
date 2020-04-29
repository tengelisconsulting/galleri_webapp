import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

import * as db from "../../types/auto/db";
type user_account = db.OpenAPI2.user_account;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpService,
  ) { }

  public async getAllUsernames(): Promise<string[]> {
    const res = await this.httpService.getReq({
      path: "/public/db/logon_names",
    });
    const data = await res.json();
    return data.map((row) => row.username_upper);
  }

  public async getUser(): Promise<user_account> {
    const res = await this.httpService.getReq({
      path: "/db/user_account",
    });
    const data = await res.json();
    return data[0];
  }

  public async createUser(
    username: string,
    password: string
  ): Promise<Response> {
    return this.httpService.postNoAuth({
      path: "/auth/init_user",
      data: {
        username: username,
        password: password,
      },
    });
  }

}

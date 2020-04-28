import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

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
    return res.json();
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

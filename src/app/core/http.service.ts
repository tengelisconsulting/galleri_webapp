import { Injectable } from '@angular/core';
import { never } from 'rxjs';
import { v4 as uuidv4 } from "uuid";

import { shallowMerge } from '../lib/fn';
import { RunTimeEnvService } from './run-time-env.service';
import { SessionService } from './session.service';


interface AppHttpRequest {
  method: "GET" | "POST" | "PUT";
  path: string;
  data?: any;
  headers: {
    [index: string]: string
  };
  cache: RequestCache,
  mode?: RequestMode,
  credentials?: RequestCredentials,
  isRawData?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseReqDefaults: Partial<AppHttpRequest> = {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "default",
    credentials: "include",
  };

  private API_HOST: string;

  constructor(
    private runtimeEnvService: RunTimeEnvService,
    private sessionService: SessionService,
  ) {
    this.runtimeEnvService.getEnv$(never())
      .subscribe((env) => this.API_HOST = env.apiHost);
  }

  public postReq(req: Partial<AppHttpRequest>): Promise<Response> {
    const reqHeaders = shallowMerge(
      req.headers || {}, this.getDefaultAuthedHeaders()
    );
    return this.doRequest(
      shallowMerge(
        this.baseReqDefaults,
        req,
        {
          method: "POST",
          headers: reqHeaders,
          mode: "cors",
        },
      )
    );
  }

  public getReq(req: Partial<AppHttpRequest>): Promise<Response> {
    const reqHeaders = shallowMerge(
      req.headers || {}, this.getDefaultAuthedHeaders()
    );
    return this.doRequest(
      shallowMerge(
        this.baseReqDefaults,
        req,
        {
          method: "GET",
          headers: reqHeaders,
          mode: "cors",
        },
      )
    );
  }

  public postNoAuth(req: Partial<AppHttpRequest>): Promise<Response> {
    return this.doRequest(
      shallowMerge(
        this.baseReqDefaults,
        req,
        { method: "POST" }
      )
    );
  }

  public newImage(data: any): Promise<Response> {
    const objId = uuidv4();
    const req = shallowMerge(this.baseReqDefaults, {
      method: "PUT",
      path: `/obj/image/${objId}`,
      data: data,
      isRawData: true,
      headers: this.getDefaultAuthedHeaders(),
      mode: "cors",
    });
    return this.doRequest(req);
  }

  private getDefaultAuthedHeaders(): {[index: string]: string} {
    return {
      'Authorization': `Bearer: ${this.sessionService.getSessionToken()}`
    };
  }

  private doRequest(req: AppHttpRequest): Promise<Response> {
    // const getReqBody = () => {
    //   if (!req.data) {
    //     return {};
    //   }
    //   if (req.isRawData) {
    //     return {
    //       body: JSON.stringify(req.data),
    //     };
    //   }
    //   return {
    //     body: req.data,
    //   };
    // };
    const reqParams = shallowMerge<RequestInit>({
      method: req.method,
      headers: new Headers(req.headers),
    }, req.data ? {
      body: req.isRawData ? req.data : JSON.stringify(req.data)
    } : {});
    console.log("request params: ", reqParams);
    const request = new Request(`${this.API_HOST}${req.path}`, reqParams);
    const requestInit: RequestInit = {
      cache: req.cache,
      mode: req.mode,
      credentials: req.credentials,
    };
    return fetch(
      request, requestInit
    );
  }
}

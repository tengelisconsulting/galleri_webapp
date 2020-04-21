import { Injectable } from '@angular/core';
import { never, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { shallowMerge } from '../lib/fn';
import { RunTimeEnvService } from './run-time-env.service';
import { SessionService } from './session.service';
import { AppRoutePath } from './routing/AppRoutePath';


interface AppHttpRequest {
  method: "GET" | "POST" | "PUT" | "DELETE";
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
    cache: "default",
    credentials: "include",
  };

  private API_HOST: string;

  constructor(
    private runtimeEnvService: RunTimeEnvService,
    private sessionService: SessionService,
    private router: Router,
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

  public deleteReq(req: Partial<AppHttpRequest>): Promise<Response> {
    const reqHeaders = shallowMerge(
      req.headers || {}, this.getDefaultAuthedHeaders()
    );
    return this.doRequest(
      shallowMerge(
        this.baseReqDefaults,
        req,
        {
          method: "DELETE",
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

  public upload(
    url: string,
    data: any
  ): Observable<{
    loaded: number,
    total: number,
  }> {
    // 'fetch' API can't give upload progress
    return new Observable((o) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      const onProgress = (e: ProgressEvent) => o.next({
        loaded: e.loaded,
        total: e.total,
      });
      const onComplete = () => o.complete();
      const onError = (e) => {
        o.error(e);
        xhr.abort();
      }
      xhr.upload.addEventListener("loadstart", onProgress, false);
      xhr.upload.addEventListener("progress", onProgress , false);
      xhr.upload.addEventListener("load", onComplete, false);
      xhr.upload.addEventListener("error", onError, false);
      xhr.send(data);
    });
  }

  private getDefaultHeaders(): {[index: string]: string} {
    return {
      "Content-Type": "application/json",
    };
  }

  private getDefaultAuthedHeaders(): {[index: string]: string} {
    return shallowMerge(this.getDefaultHeaders(), {
      'Authorization': `Bearer: ${this.sessionService.getSessionToken()}`
    });
  }

  private async doRequest(req: AppHttpRequest): Promise<Response> {
    const reqParams = shallowMerge<RequestInit>({
      method: req.method,
      headers: new Headers(req.headers),
    }, req.data ? {
      body: req.isRawData ? req.data : JSON.stringify(req.data)
    } : {});
    const request = new Request(`${this.API_HOST}${req.path}`, reqParams);
    const requestInit: RequestInit = {
      cache: req.cache,
      mode: req.mode,
      credentials: req.credentials,
    };
    const response = await fetch(request, requestInit);
    if (response.status === 401) {
      // our session has expired
      console.log("session expired");
      this.router.navigate([AppRoutePath.LOGIN]);
    }
    return response;
  }
}

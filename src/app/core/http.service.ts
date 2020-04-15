import { Injectable } from '@angular/core';
import { never, Observable } from 'rxjs';
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

  public newImage(data: any): Observable<{
    loaded: number,
    total: number,
  }> {
    const objId = uuidv4();
    return this.upload(`/obj/image/${objId}`, data);
  }

  private upload(
    path: string,
    file: File,
  ): Observable<{
    loaded: number,
    total: number,
  }> {
    // 'fetch' API can't give upload progress
    return new Observable((o) => {
      const url = `${this.API_HOST}${path}`;
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      const headers = this.getDefaultAuthedHeaders();
      Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
      });
      xhr.setRequestHeader("Content-Type", file.type);
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
      xhr.send(file);
    });
  }

  private getDefaultAuthedHeaders(): {[index: string]: string} {
    return {
      'Authorization': `Bearer: ${this.sessionService.getSessionToken()}`
    };
  }

  private doRequest(req: AppHttpRequest): Promise<Response> {
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
    return fetch(
      request, requestInit
    );
  }
}

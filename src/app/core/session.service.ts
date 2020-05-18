import { Injectable } from '@angular/core';
import { merge } from "lodash";
import { never, Observable } from 'rxjs';

import { State } from './state/state';
import { takeUntil, filter, map, startWith } from 'rxjs/operators';

interface InternalState {
  userId: string;
  isStarted: boolean;
  sessionToken: string;
  urlBeforeSessionExpire: string;
}


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private get EMPTY_STATE(): InternalState {
    return {
      userId: null,
      isStarted: false,
      sessionToken: null,
      urlBeforeSessionExpire: null,
    };
  }

  private internalState: State<InternalState> = new State(
    never(), merge(
      {}, this.EMPTY_STATE, { isStarted: null }
    )
  );

  constructor() { }

  public enterSession(
    userId: string,
    sessionToken: string,
  ): void {
    this.internalState.update({
      userId: userId,
      sessionToken: sessionToken,
      isStarted: true,
    });
  }

  public exitSession(): void {
    this.internalState.update(this.EMPTY_STATE);
  }

  public isAuthenticated(): boolean {
    return !!this.internalState.value.sessionToken;
  }

  public saveIntendedUrl(
    url: string
  ): void {
    this.internalState.update({
      urlBeforeSessionExpire: url,
    });
  }

  public getStartedStream(
    until$: Observable<any>
  ): Observable<boolean> {
    return this.internalState.changeStream().pipe(
      takeUntil(until$),
      filter((change) => change.isStarted !== undefined),
      map((change) => change.isStarted),
      startWith(this.internalState.value.isStarted)
    );
  }

  public isAnonSession(): boolean {
    return this.internalState.value.isStarted &&
      this.internalState.value.userId === null;
  }

  public getSessionToken(): string {
    return this.internalState.value.sessionToken;
  }

  public getUserId(): string {
    return this.internalState.value.userId;
  }
}

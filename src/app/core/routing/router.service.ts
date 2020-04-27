import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, never } from 'rxjs';

import { State } from '../state/state';
import { AppRoutePath } from './AppRoutePath';


interface RouterState {
  activePath: AppRoutePath,
  activeUrl: string,
}

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private state: State<RouterState> = new State(never(), {
    activeUrl: undefined,
    activePath: undefined,
  });

  constructor(
    private router: Router,
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.state.update({
        activeUrl: event.url,
      });
      const urlMatch = event.url.match(/\/app\/([^\?]+).*/);
      if (!urlMatch) {
        throw new Error(`failed to parse url: ${event.url}`);
      }
      const path = urlMatch[1];
      if (path !== this.state.value.activePath) {
        this.state.update({
          activePath: AppRoutePath[path],
        });
      }
    });
  }


  public getActiveAppPathStream(
    until: Observable<any>
  ): Observable<AppRoutePath> {
    return this.state.changeStream().pipe(
      filter((change) => change.activePath !== undefined),
      map((change) => change.activePath),
      takeUntil(until),
    );
  }

}

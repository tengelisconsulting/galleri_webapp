import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private resizeSubject: Subject<any> = new Subject()

  constructor() {
    window.onresize = () => this.resizeSubject.next(true);
  }

  public getResizeStream(
    until: Observable<any>,
    resolutionMs: number
  ): Observable<{ height: number, width: number }> {
    const getSize = () => ({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    return this.resizeSubject.pipe(
      startWith(getSize()),
      takeUntil(until),
      debounceTime(resolutionMs),
      map((_) => getSize()),
    );
  }
}

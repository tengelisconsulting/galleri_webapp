import { OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';


export class BaseComponent implements OnInit, OnDestroy {

  private onInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private onDestroy$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isDestroyed$: Observable<boolean> = this.onDestroy$.pipe(
    filter((isDestroyed) => !!isDestroyed),
    take(1),
  );
  public isInited$: Observable<boolean> = this.onInit$.pipe(
    filter((isInited) => !!isInited),
    take(1),
  );

  public ngOnInit(): void {
    this.onInit$.next(true);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  public appOnInit(
    fn: () => void
  ): void {
    this.isInited$.subscribe(fn);
  }

  public appOnDestroy(
    fn: () => void
  ): void {
    this.isDestroyed$.subscribe(fn);
  }

}

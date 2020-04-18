import { OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';


export class BaseComponent implements OnInit, OnDestroy {

  public onInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public onDestroy$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isDestroyed$: Observable<boolean> = this.onDestroy$.pipe(
    filter((isDestroyed) => !!isDestroyed)
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
    this.onInit$.pipe(
      filter((isInit) => isInit),
      take(1)
    ).subscribe(fn);
  }

  public appOnDestroy(
    fn: () => void
  ): void {
    this.onDestroy$.pipe(
      filter((isDestroyed) => isDestroyed),
      take(1)
    ).subscribe(fn);
  }

}

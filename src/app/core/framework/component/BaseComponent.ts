import { OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';


export class BaseComponent implements OnInit, OnDestroy, AfterViewInit {

  private onInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private onDestroy$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private afterViewInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isDestroyed$: Observable<boolean> = this.onDestroy$.pipe(
    filter((isDestroyed) => !!isDestroyed),
    take(1),
  );
  public isInited$: Observable<boolean> = this.onInit$.pipe(
    filter((isInited) => !!isInited),
    take(1),
  );

  public isViewInited$: Observable<boolean> = this.afterViewInit$.pipe(
    filter((isInited) => !!isInited),
    take(1),
  );

  public ngOnInit(): void {
    this.onInit$.next(true);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  public ngAfterViewInit(): void {
    this.afterViewInit$.next(true);
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

  public appAfterViewInit(
    fn: () => void
  ): void {
    this.isViewInited$.subscribe(fn);
  }

}

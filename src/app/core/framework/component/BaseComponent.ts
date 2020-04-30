import { OnDestroy, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, filter, takeUntil } from 'rxjs/operators';


export class BaseComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  private onInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private onDestroy$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private afterViewInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private onChanges$: Subject<SimpleChanges> = new Subject();

  public isDestroyed$: Observable<boolean> = this.onDestroy$.pipe(
    filter((isDestroyed) => !!isDestroyed),
    take(1),
  );
  public isInited$: Observable<boolean> = this.onInit$.pipe(
    filter((isInited) => !!isInited),
    take(1),
  );
  public change$: Observable<SimpleChanges> = this.onChanges$.pipe(
    takeUntil(this.isDestroyed$)
  );

  public isViewInited$: Observable<boolean> = this.afterViewInit$.pipe(
    filter((isInited) => !!isInited),
    take(1),
  );

  // app angular methods
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
  public appNgOnChanges(
    fn: (changes: SimpleChanges) => void
  ): void {
    this.change$.subscribe(fn);
  }

  // angular methods
  public ngOnInit(): void {
    this.onInit$.next(true);
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
  public ngAfterViewInit(): void {
    this.afterViewInit$.next(true);
  }
  public ngOnChanges(changes: SimpleChanges): void {
    this.onChanges$.next(changes);
  }


}

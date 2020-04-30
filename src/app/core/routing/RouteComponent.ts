import { ActivatedRoute } from '@angular/router';
import { takeUntil, flatMap, map } from 'rxjs/operators';
import { ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseComponent } from '../framework/component/BaseComponent';
import { AppComponent } from 'src/app/app.component';
import { TopbarButtonComponent } from 'src/app/modules/shared/topbar/topbar-button/topbar-button.component';
import { TopbarService } from 'src/app/layout/topbar/topbar.service';


export class RouteComponent<P> extends BaseComponent {

  public params: P;

  public paramStream: Observable<P>;

  @ViewChildren(TopbarButtonComponent)
  private topbarButtons: QueryList<TopbarButtonComponent>;

  constructor(
    protected cdr: ChangeDetectorRef,
  ) {
    super();
    this.paramStream = AppComponent.injector.get(ActivatedRoute)
      .queryParams
      .pipe(
        takeUntil(this.isDestroyed$),
        flatMap((params) => this.isInited$.pipe(
          map(() => params))),  // wait for component to init
      ) as Observable<P>;

    this.appOnInit(() => {
      this.paramStream.subscribe((params: P) => {
        this.params = params;
        this.cdr.detectChanges();
      });
    });
    this.appAfterViewInit(() => {
      AppComponent.injector.get(TopbarService)
        .updateButtons(this.topbarButtons.toArray());
    });
  }

}

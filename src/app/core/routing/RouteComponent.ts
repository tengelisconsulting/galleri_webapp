import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

import { BaseComponent } from '../framework/component/BaseComponent';
import { AppComponent } from 'src/app/app.component';


export class RouteComponent<P> extends BaseComponent {

  public params: P;

  constructor(
    protected cdr: ChangeDetectorRef,
  ) {
    super();
    this.appOnInit(() => {
      AppComponent.injector.get(ActivatedRoute).queryParams.pipe(
        takeUntil(this.isDestroyed$)
      ).subscribe((params: P) => {
        this.params = params;
        this.cdr.detectChanges();
      });
    });
  }

}

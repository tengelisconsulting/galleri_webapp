import { Injectable } from '@angular/core';
import { State } from 'src/app/core/state/state';
import { TopbarButtonComponent } from 'src/app/modules/shared/topbar/topbar-button/topbar-button.component';
import { never, Observable } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';


interface TopbarState {
  buttons: TopbarButtonComponent[];
}

@Injectable({
  providedIn: 'root'
})
export class TopbarService {

  private state: State<TopbarState> = new State(never(), {
    buttons: [],
  });

  constructor() { }

  public updateButtons(btns: TopbarButtonComponent[]): void {
    this.state.update({
      buttons: btns,
    });
  }

  public getButton$(
    until: Observable<any>
  ): Observable<TopbarButtonComponent[]> {
    return this.state.changeStream().pipe(
      filter((change) => change.buttons !== undefined),
      map((change) => change.buttons),
      takeUntil(until),
    );
  }

}

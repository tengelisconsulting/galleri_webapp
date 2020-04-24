import { Injectable } from '@angular/core';
import { State } from 'src/app/core/state/state';
import { never, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


interface SpinnerState {
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private state: State<SpinnerState> = new State(
    never(), {
      isVisible: false,
    }
  );

  constructor() { }

  public showSpinner(): void {
    this.state.update({
      isVisible: true,
    });
  }

  public hideSpinner(): void {
    this.state.update({
      isVisible: false,
    });
  }

  public getStateStream(
    until: Observable<any>
  ): Observable<SpinnerState> {
    return this.state.valueStream().pipe(
      takeUntil(until),
    );
  }
}

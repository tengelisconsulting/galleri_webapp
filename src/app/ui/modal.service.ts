import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalInit } from '../types/ModalInit';
import { takeUntil } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalInit$: BehaviorSubject<ModalInit> =
    new BehaviorSubject(null);

  constructor() { }

  public showModal(
    init: ModalInit,
  ): void {
    this.modalInit$.next(init);
    const elem: any = document.getElementById("modal-prototype")
    elem.showModal();
  }

  public hideModal(): void {
    this.modalInit$.next(null);
    const elem: any = document.getElementById("modal-prototype")
    elem.close();
  }

  public getActiveModal$(
    until: Observable<any>
  ): Observable<ModalInit> {
    return this.modalInit$.pipe(
      takeUntil(until)
    );
  }

}

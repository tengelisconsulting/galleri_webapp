import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar-button',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarButtonComponent {

  @Input()
  public text: string;

  @Input()
  public color: string;

  @Output()
  public clicked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public onClick(): void {
    this.clicked.emit(true);
  }

}

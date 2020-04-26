import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar-button',
  templateUrl: './topbar-button.component.html',
  styleUrls: ['./topbar-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarButtonComponent {

  @Input()
  public text: string;

  @Output()
  public clicked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public onClick(): void {
    this.clicked.emit(true);
  }

}

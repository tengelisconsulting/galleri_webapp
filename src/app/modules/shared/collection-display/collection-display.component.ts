import { Component, Input, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayComponent {

  @Input()
  public id: string;

  constructor() { }

}

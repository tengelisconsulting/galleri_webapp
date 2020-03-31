import { Component, Input } from '@angular/core';
import { ModalComponent } from 'src/app/types/ModalComponent';

interface InitParams {
  id: string;
}

@Component({
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.css']
})
export class CollectionDisplayComponent implements ModalComponent<InitParams> {

  public id: string;

  constructor() { }

  public init(params: InitParams): void {
    this.id = params.id;
  }

}

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from 'src/app/types/ModalComponent';


interface InitParams {
  id: string;
}

@Component({
  selector: 'app-collection-display-modal',
  templateUrl: './collection-display-modal.component.html',
  styleUrls: ['./collection-display-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionDisplayModalComponent extends ModalComponent<InitParams> {

  constructor() {
    super();
  }

}

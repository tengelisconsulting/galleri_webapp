import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { CollectionDisplayModalComponent } from '../collection-display-modal/collection-display-modal.component';

@Component({
  selector: 'app-collection-thumb',
  templateUrl: './collection-thumb.component.html',
  styleUrls: ['./collection-thumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionThumbComponent {

  @Input()
  public id: string;

  constructor(
    private modalService: ModalService,
  ) { }

  public onClick(): void {
    this.modalService.showModal({
      component: CollectionDisplayModalComponent,
      init: (c) => c.init({id: this.id}),
    });
  }
}

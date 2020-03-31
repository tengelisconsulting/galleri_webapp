import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { CollectionDisplayComponent } from '../collection-display/collection-display.component';

@Component({
  selector: 'app-collection-thumb',
  templateUrl: './collection-thumb.component.html',
  styleUrls: ['./collection-thumb.component.css']
})
export class CollectionThumbComponent {

  @Input()
  public id: string;

  constructor(
    private modalService: ModalService,
  ) { }

  public onClick(): void {
    this.modalService.showModal({
      component: CollectionDisplayComponent,
      init: (c) => c.init({id: this.id}),
    });
  }
}

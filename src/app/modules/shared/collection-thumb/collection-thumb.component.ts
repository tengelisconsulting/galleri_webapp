import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { CollectionDisplayModalComponent } from '../collection-display-modal/collection-display-modal.component';

// import * as db from "../../../types/auto/db";
// type user_collection_thumb = db.OpenAPI2.user_collection_thumb;


@Component({
  selector: 'app-collection-thumb',
  templateUrl: './collection-thumb.component.html',
  styleUrls: ['./collection-thumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionThumbComponent {

  @Input()
  public id: string;

  public imageUrl: string;

  constructor(
    private modalService: ModalService,
  ) { }

  public ngOnInit(): void {
    this.imageUrl = `/db/user_collection_thumb?collection_id=eq.${this.id}&select=thumb_b64`;
  }

  public onClick(): void {
    this.modalService.showModal({
      component: CollectionDisplayModalComponent,
      init: (c) => c.init({id: this.id}),
    });
  }

}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { CreateCollectionModalComponent } from 'src/app/modules/shared/create-collection-modal/create-collection-modal.component';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {

  constructor(
    private modalService: ModalService,
  ) { }

  public openCreateCollectionModal(): void {
    this.modalService.showModal({
      component: CreateCollectionModalComponent,
    });
  }

}

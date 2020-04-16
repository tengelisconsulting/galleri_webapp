import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';

@Component({
  selector: 'app-create-collection-modal',
  templateUrl: './create-collection-modal.component.html',
  styleUrls: ['./create-collection-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionModalComponent implements OnInit {

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit() {
  }

  public onComplete(isSuccess: boolean): void {
    this.modalService.hideModal();
  }

}

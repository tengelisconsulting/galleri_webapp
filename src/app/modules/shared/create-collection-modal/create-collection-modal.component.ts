import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-create-collection-modal',
  templateUrl: './create-collection-modal.component.html',
  styleUrls: ['./create-collection-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

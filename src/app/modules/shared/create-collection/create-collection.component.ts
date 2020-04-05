import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

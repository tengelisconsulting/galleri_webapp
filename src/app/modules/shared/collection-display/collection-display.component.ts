import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.css']
})
export class CollectionDisplayComponent implements OnInit {

  @Input()
  public id: string;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collection-thumb',
  templateUrl: './collection-thumb.component.html',
  styleUrls: ['./collection-thumb.component.css']
})
export class CollectionThumbComponent implements OnInit {

  @Input()
  public id: string;
  
  constructor() { }

  ngOnInit() {
  }

}

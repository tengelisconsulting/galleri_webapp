import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-pieces-yours',
  templateUrl: './all-pieces-yours.component.html',
  styleUrls: ['./all-pieces-yours.component.css']
})
export class AllPiecesYoursComponent implements OnInit {

  public collectionIds: string[] = [ "a1", "b2", "c3" ]

  constructor() { }

  ngOnInit() {

  }

}

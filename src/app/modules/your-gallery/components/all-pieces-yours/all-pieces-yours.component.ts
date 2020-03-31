import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-all-pieces-yours',
  templateUrl: './all-pieces-yours.component.html',
  styleUrls: ['./all-pieces-yours.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPiecesYoursComponent implements OnInit {

  public collectionIds: string[] = [ "a1", "b2", "c3" ]

  constructor() { }

  ngOnInit() {

  }

}

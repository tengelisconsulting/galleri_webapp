import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as db from "../../../../types/auto/db";
import { CollectionService } from 'src/app/core/data/collection.service';
type image_collection = db.OpenAPI2.image_collection


@Component({
  selector: 'app-all-pieces-yours',
  templateUrl: './all-pieces-yours.component.html',
  styleUrls: ['./all-pieces-yours.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPiecesYoursComponent implements OnInit {

  public collections: image_collection[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private collectionService: CollectionService,
  ) { }

  ngOnInit() {
    this.loadCollections();
  }

  private async loadCollections(): Promise<void> {
    this.collections = await this.collectionService
      .getAllCollectionsCurrentUser();
    this.cdr.detectChanges();
  }

}

import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';

import * as db from "../../../../types/auto/db";
type user_image_collection = db.OpenAPI2.user_image_collection

@Component({
  selector: 'app-all-pieces-yours',
  templateUrl: './all-pieces-yours.component.html',
  styleUrls: ['./all-pieces-yours.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPiecesYoursComponent implements OnInit {

  public collections: user_image_collection[] = [];

  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.loadCollections();
  }

  private async loadCollections(): Promise<void> {
    const res = await this.httpService.getReq({
      path: "/db/user_image_collection",
    });
    this.collections = await res.json();
    this.cdr.detectChanges();
  }

}

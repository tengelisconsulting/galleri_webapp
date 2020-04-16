import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { HttpService } from 'src/app/core/http.service';

import * as db from "../../../types/auto/db";
type user_collection_images = db.OpenAPI2.user_collection_images;


@Component({
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayComponent {

  @Input()
  public id: string;

  public images: user_collection_images[] = [];

  constructor(
    private httpService: HttpService,
  ) {
    this.loadCollection();
  }

  public async loadCollection(): Promise<void> {
    const res = await this.httpService.getReq({
      path: "/db/user_collection_images",
    });
    this.images = await res.json();
  }

}

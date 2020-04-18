import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { HttpService } from 'src/app/core/http.service';

import * as db from "../../../types/auto/db";
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
type user_image = db.OpenAPI2.user_image;
type user_image_collection = db.OpenAPI2.user_image_collection;


@Component({
  selector: 'app-collection-display',
  templateUrl: './collection-display.component.html',
  styleUrls: ['./collection-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDisplayComponent extends BaseComponent {

  @Input()
  public collectionId: string;

  public images: user_image[] = [];

  public collection: user_image_collection;

  constructor(
    private cdr: ChangeDetectorRef,
    private httpService: HttpService,
  ) {
    super();
    this.appOnInit(() => {
      this.loadImages();
      this.loadCollection();
    });
  }

  public async loadImages(): Promise<void> {
    const url = `/db/user_image?collection_id=eq.${this.collectionId}`;
    const res = await this.httpService.getReq({path: url});
    this.images = await res.json();
    this.cdr.detectChanges();
  }

  public async loadCollection(): Promise<void> {
    const url = `/db/user_image_collection?collection_id=eq.${this.collectionId}`;
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    this.collection = data[0];
    this.cdr.detectChanges();
  }

}

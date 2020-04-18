import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { HttpService } from 'src/app/core/http.service';

import * as db from "../../../types/auto/db";
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
type user_image = db.OpenAPI2.user_image;


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

  constructor(
    private cdr: ChangeDetectorRef,
    private httpService: HttpService,
  ) {
    super();
    this.appOnInit(() => {
      this.loadCollection();
    });
  }

  public async loadCollection(): Promise<void> {
    const url = `/db/user_image?collection_id=eq.${this.collectionId}`;
    const res = await this.httpService.getReq({path: url});
    this.images = await res.json();
    this.cdr.detectChanges();
  }

}

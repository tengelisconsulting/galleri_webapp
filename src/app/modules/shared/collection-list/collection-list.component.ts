import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import * as db from "../../../types/auto/db";
type image_collection = db.OpenAPI2.image_collection;

import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { WindowService } from 'src/app/ui/window.service';
import { take } from 'rxjs/operators';
import { CollectionService } from 'src/app/core/data/collection.service';


@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionListComponent extends BaseComponent {

  @Input()
  private userId: string;

  @Input()
  private forCurrentUser: boolean = false;

  public collections: image_collection[] = [];
  public windowWidth: number;


  constructor(
    private cdr: ChangeDetectorRef,
    private collectionService: CollectionService,
    private windowService: WindowService,
  ) {
    super();
    this.appOnInit(() => {
      this.loadCollections();
      this.windowService.getResizeStream(this.isDestroyed$, 1000)
        .pipe(take(1))
        .subscribe((size) => {
          this.windowWidth = size.width;
          this.cdr.detectChanges();
        });
    });
  }

  private async loadCollections(): Promise<void> {
    if (this.forCurrentUser) {
      this.collections = await this.collectionService
        .getAllCollectionsCurrentUser()
    } else {
      this.collections = await this.collectionService
        .getAllCollections(this.userId);
    }
    this.cdr.detectChanges();
  }

}

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as db from "../../../../types/auto/db";
type image_collection = db.OpenAPI2.image_collection;

import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { UserService } from 'src/app/core/data/user.service';
import { CollectionService } from 'src/app/core/data/collection.service';


@Component({
  selector: 'app-collections-route',
  templateUrl: './collections-route.component.html',
  styleUrls: ['./collections-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionsRouteComponent extends RouteComponent<{
  user: string;
}> {

  public collections: image_collection[] = [];

  constructor(
    cdr: ChangeDetectorRef,
    private collectionService: CollectionService,
    private userService: UserService,
  ) {
    super(cdr);
    this.paramStream.subscribe((params) => {
      this.loadCollections(params.user);
    });
  }

  private async loadCollections(
    usernameUpper: string
  ): Promise<void> {
    const userId = await this.userService.getUserId(usernameUpper);
    this.collections = await this.collectionService
      .getAllCollections(userId);
    console.log("collections", this.collections);
    this.cdr.detectChanges();
  }

}

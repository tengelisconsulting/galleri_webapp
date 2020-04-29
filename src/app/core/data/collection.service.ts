import { Injectable } from '@angular/core';

import * as db from "../../types/auto/db";
type image = db.OpenAPI2.image;
type image_collection = db.OpenAPI2.image_collection;

import { HttpService } from '../http.service';
import { shallowMerge } from 'src/app/lib/fn';
import { SessionService } from '../session.service';
import { getPGQueryUrl } from '../framework/postgrest-query-builder';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private httpService: HttpService,
    private sessionService: SessionService,
  ) { }

  public async getAllCollectionsCurrentUser(
  ): Promise<image_collection[]> {
    return this.getAllCollections(this.sessionService.getUserId());
  }

  public async getAllCollections(
    userId: string
  ): Promise<image_collection[]> {
    const url = getPGQueryUrl("image_collection", [
      ["user_id.eq." + userId],
    ]);
    const res = await this.httpService.getReq({path: url});
    return res.json();
  }

  public async updateCollection(
    collectionId: string,
    update: {
      collectionName?: string,
      images?: string[],
    }
  ): Promise<Response> {
    const data = shallowMerge(
      {}, {
        "p_collection_id": collectionId,
        "p_collection_name": update.collectionName,
        "p_images": update.images,
      }
    );
    const res = await this.httpService.postReq({
      path: "/db/rpc/collection_update",
      data: data,
    });
    return res;
  }

  public async addImageToCollection(
    imageId: string,
    collectionId: string,
  ): Promise<boolean> {
    const url = "/db/rpc/add_image_to_collection";
    const data = {
      "p_image_id": imageId,
      "p_collection_id": collectionId,
    };
    const res = await this.httpService.postReq({
      path: url,
      data: data,
    });
    return res.ok;
  }

  public async deleteCollection(
    collectionId: string
  ): Promise<Response> {
    const url = "/db/rpc/collection_delete";
    const data = {
      "p_collection_id": collectionId,
    };
    const res = await this.httpService.postReq({
      path: url,
      data: data,
    });
    return res;
  }
}

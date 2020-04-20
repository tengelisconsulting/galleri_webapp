import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

import * as db from "../../types/auto/db";
import { getPGQueryUrl } from '../framework/postgrest-query-builder';
type user_image = db.OpenAPI2.user_image;
type user_image_collection = db.OpenAPI2.user_image_collection;

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  constructor(
    private httpService: HttpService,
  ) { }

  public async getImagesForCollection(
    collectionId: string
  ): Promise<user_image[]> {
    const url = getPGQueryUrl("user_image", [
      ["collection_id.eq." + collectionId]
    ]);
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    return data;
  }

  public async getCollection(
    collectionId: string
  ): Promise<user_image_collection> {
    const url = getPGQueryUrl("user_image_collection", [
      ["collection_id.eq." + collectionId]
    ]);
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    return data[0];
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

  public async getImage(
    collectionId: string,
    imageId: string
  ): Promise<user_image> {
    const url = getPGQueryUrl("user_image", [
      ["collection_id.eq." + collectionId,
       "image_id.eq." + imageId]
    ])
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    return data[0];
  }

}

import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

import * as db from "../../types/auto/db";
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
    const url = `/db/user_image?collection_id=eq.${collectionId}`;
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    return data;
  }

  public async getCollection(
    collectionId: string
  ): Promise<user_image_collection> {
    const url = `/db/user_image_collection?collection_id=eq.${collectionId}`;
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    return data[0];
  }



}

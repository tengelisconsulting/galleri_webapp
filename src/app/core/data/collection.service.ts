import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { shallowMerge } from 'src/app/lib/fn';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private httpService: HttpService,
  ) { }

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
}

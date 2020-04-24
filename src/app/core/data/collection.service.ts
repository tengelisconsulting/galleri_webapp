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
    console.log("data is:", data);
    const res = await this.httpService.postReq({
      path: "/db/rpc/collection_update",
      data: data,
    });
    return res;
  }
}

import { Injectable } from '@angular/core';

import * as db from "../../types/auto/db";
type user_image = db.OpenAPI2.user_image;
type user_image_collection = db.OpenAPI2.user_image_collection;

import { HttpService } from '../http.service';
import { getPGQueryUrl } from '../framework/postgrest-query-builder';


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

  public async createImage(
    imageId: string,
    href: string,
    thumbB64: string,
  ): Promise<Response> {
    const url = "/db/rpc/user_image_create";
    const reqData = {
      "p_obj_id": imageId,
      "p_href": href,
      "p_thumb_b64": thumbB64,
    }
    const res = await this.httpService.postReq({
      path: url,
      data: reqData,
    });
    return res;
  }

  public async updateImage(
    imageId: string,
    update: Partial<user_image>
  ): Promise<Response> {
    const url = "/db/rpc/image_update";
    const reqData = {
      "p_obj_id": imageId,
      "p_href": update.href,
      "p_description": update.description,
    }
    const res = await this.httpService.postReq({
      path: url,
      data: reqData,
    });
    return res;
  }

  public async deleteImage(
    imageId: string
  ): Promise<void> {
    const urlRes = await this.httpService.getReq({
      path: `/obj-access/${imageId}/delete`,
    });
    if (!urlRes.ok) {
      throw new Error("failed to acquire storage delete URL");
    }
    const deleteUrl = await urlRes.json();
    console.log("delete url", deleteUrl);
    const deleteRes = await this.httpService.deleteReq({
      path: deleteUrl,
      isExternal: true,
      headers: {
        "Authorization": undefined,
      }
    });
    if (!deleteRes.ok) {
      throw new Error("failed to delete object from storage");
    }
    const dbDeleteRes = await this.httpService.postReq({
      path: "/db/rpc/user_image_delete",
      data: {
        "p_obj_id": imageId,
      },
    });
    if (!dbDeleteRes.ok) {
      throw new Error("failed to delete object record");
    }
  }

  public async getImage(
    imageId: string
  ): Promise<user_image> {
    const url = getPGQueryUrl("user_image", [
      ["image_id.eq." + imageId]
    ])
    const res = await this.httpService.getReq({path: url});
    const data = await res.json();
    return data[0];
  }

  public async getFullImageUrl(
    imageId: string
  ): Promise<string> {
    const url = `/obj-access/${imageId}/read`;
    const res = await this.httpService.getReq({
      path: url,
    });
    const data = await res.json();
    return data["url_b64"];
  }

  public async getCreateImageUrl(
    imageId: string
  ): Promise<{url: string, fields: any}> {
    const url = `/obj-access/${imageId}/create`;
    const res = await this.httpService.getReq({
      path: url,
    });
    const data = await res.json();
    return data;
  }

}

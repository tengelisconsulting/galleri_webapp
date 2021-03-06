import { Injectable } from '@angular/core';

import * as db from "../../types/auto/db";
type image = db.OpenAPI2.image;
type image_collection = db.OpenAPI2.image_collection;

import { HttpService } from '../http.service';
import { getPGQueryUrl } from '../framework/postgrest-query-builder';
import { shallowMerge } from 'src/app/lib/fn';
import { SessionService } from '../session.service';


@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  constructor(
    private httpService: HttpService,
    private sessionService: SessionService,
  ) { }

  public async getImagesForCollection(
    collectionId: string
  ): Promise<image[]> {
    const url = getPGQueryUrl("image_public", [
      ["collection_id.eq." + collectionId],
    ]);
    const res = await this.httpService.getReq({path: url});
    const data: image[] = await res.json();
    return data.sort((im1, im2) => im1.ordinal - im2.ordinal);
  }

  public async createImage(
    imageId: string,
    href: string,
    thumbB64: string,
  ): Promise<Response> {
    const url = "/db/rpc/user_image_create";
    const reqData = {
      "p_image_id": imageId,
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
    update: Partial<image>
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

  public async deleteImageFromStorage(
    imageId: string
  ): Promise<void> {
    const urlRes = await this.httpService.getReq({
      path: `/obj-access/${imageId}/delete`,
    });
    if (!urlRes.ok) {
      throw new Error("failed to acquire storage delete URL");
    }
    const deleteUrl = await urlRes.json();
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
  }

  public async deleteOrphanImage(
    imageId: string
  ): Promise<void> {
    const storageRes = await this.deleteImageFromStorage(imageId);
    const dbDeleteRes = await this.httpService.postReq({
      path: "/db/rpc/user_orphan_image_delete",
      data: {
        "p_image_id": imageId,
      },
    });
    if (!dbDeleteRes.ok) {
      throw new Error("failed to delete object record");
    }
  }

  public async deleteImage(
    collectionId: string,
    imageId: string
  ): Promise<void> {
    const storageRes = await this.deleteImageFromStorage(imageId);
    const dbDeleteRes = await this.httpService.postReq({
      path: "/db/rpc/user_image_delete",
      data: {
        "p_collection_id": collectionId,
        "p_image_id": imageId,
      },
    });
    if (!dbDeleteRes.ok) {
      throw new Error("failed to delete object record");
    }
  }

  public async getImage(
    imageId: string
  ): Promise<image> {
    const url = getPGQueryUrl("image_public", [
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
    return await res.json();
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

  public getImageThumbUrl(
    imageId: string
  ): string {
    return getPGQueryUrl("image_thumb", [
      ["image_id.eq." + imageId]
    ], ["thumb"]);
  }

}

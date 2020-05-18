import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { HttpService } from 'src/app/core/http.service';


@Component({
  selector: 'app-anon-gallery-view-route',
  templateUrl: './anon-gallery-view-route.component.html',
  styleUrls: ['./anon-gallery-view-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnonGalleryViewRouteComponent extends RouteComponent<{
  collectionId: string,
  accessToken: string,
}> {

  constructor(
    cdr: ChangeDetectorRef,
    private httpService: HttpService,
  ) {
    super(cdr);
    this.appOnInit(() => {
      console.log("params: ", this.params);
      this.doTest();
    });
  }

  public async doTest(): Promise<void> {
    const authHeaders = {
      "Authorization": `Claims: ${this.params.accessToken}`,
    };
    const res = await this.httpService.getReq({
      path: `/db/image_collection_public?collection_id=eq.${this.params.collectionId}`,
      headers: authHeaders,
    });
    console.log("res: ", res);
  }

}

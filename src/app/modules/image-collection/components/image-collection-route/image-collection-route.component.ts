import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from 'src/app/core/http.service';


@Component({
  selector: 'app-image-collection-route',
  templateUrl: './image-collection-route.component.html',
  styleUrls: ['./image-collection-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCollectionRouteComponent extends BaseComponent {

  public images = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
  ) {
    super();
    this.appOnInit(() => {
      this.activatedRoute.queryParams.pipe(
        takeUntil(this.isDestroyed$)
      ).subscribe((params) => {
        this.loadImages(params.collectionId)
      })
    });
  }

  private async loadImages(collectionId: string): Promise<void> {
    const url = `/db/user_image?collection_id=eq.${collectionId}`;
    const res = await this.httpService.getReq({
      path: url,
    });
    this.images = await res.json();
    console.log("images", this.images);
  }

}

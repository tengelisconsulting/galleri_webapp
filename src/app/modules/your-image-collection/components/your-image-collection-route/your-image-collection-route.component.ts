import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http.service';
import { MatBottomSheet } from '@angular/material';
import { LinkDisplayComponent } from '../link-display/link-display.component';


@Component({
  selector: 'app-your-image-collection-route',
  templateUrl: './your-image-collection-route.component.html',
  styleUrls: ['./your-image-collection-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourImageCollectionRouteComponent extends RouteComponent<{
  collectionId: string;
}> {

  constructor(
    cdr: ChangeDetectorRef,
    private bootomSheet: MatBottomSheet,
    private httpService: HttpService,
    private router: Router,
  ) {
    super(cdr);
  }

  public editCollection(): void {
    this.router.navigate([
      AppRoutePath.APP_PREFIX, AppRoutePath.EDIT_IMAGE_COLLECTION
    ], {
      queryParams: {
        collectionId: this.params.collectionId,
      }
    });
  }

  public async generateAnonLink(): Promise<void> {
    this.bootomSheet.open(LinkDisplayComponent, {
      data: {
        collectionId: this.params.collectionId,
      }
    })
  }

}

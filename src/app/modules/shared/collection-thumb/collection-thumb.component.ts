import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalService } from 'src/app/ui/modal.service';
import { CollectionDisplayModalComponent } from '../collection-display-modal/collection-display-modal.component';
import { HttpService } from 'src/app/core/http.service';

// import * as db from "../../../types/auto/db";
// type user_collection_thumb = db.OpenAPI2.user_collection_thumb;


@Component({
  selector: 'app-collection-thumb',
  templateUrl: './collection-thumb.component.html',
  styleUrls: ['./collection-thumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionThumbComponent implements OnInit {

  @Input()
  public id: string;

  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.loadThumb();
  }

  public onClick(): void {
    this.modalService.showModal({
      component: CollectionDisplayModalComponent,
      init: (c) => c.init({id: this.id}),
    });
  }

  public async loadThumb(): Promise<void> {
    const url = `/db/user_collection_thumb?collection_id=eq.${this.id}`;
    const res = await this.httpService.getReq({
      path: url,
      // headers: {
      //   "Accept": "application/octet-stream",
      // },
    });
    const resData = await res.json();
    const elem: any = document.getElementById("the-image");
    // you have to store the image type too
    elem.src = "data:image/jpeg;base64, " + resData[0].thumb_b64;
    this.cdr.detectChanges();
  }
}

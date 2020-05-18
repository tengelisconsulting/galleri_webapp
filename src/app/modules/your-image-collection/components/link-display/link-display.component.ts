import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { HttpService } from 'src/app/core/http.service';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';


interface AnonCollectionLinkParams {
  collectionId: string;
}

@Component({
  selector: 'app-link-display',
  templateUrl: './link-display.component.html',
  styleUrls: ['./link-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkDisplayComponent implements OnInit {

  @ViewChild("successTooltip", {static: true})
  private successTooltip;

  public expiresAt: Date;
  public link: string;

  private readonly DEFAULT_EXPIRE_DAYS = 2;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: AnonCollectionLinkParams,
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.loadLink();
  }

  private async loadLink(): Promise<void> {
    const expTs = ((new Date()).getTime() / 1000.0)
      + this.DEFAULT_EXPIRE_DAYS * 24 * 60 * 60;
    this.expiresAt = new Date(expTs * 1000);
    const collectionId = this.data.collectionId;
    const res = await this.httpService.getReq({
      path: `/anon-collection-link/${collectionId}/${expTs}`,
    });
    const data = await res.json();
    const accessToken = encodeURIComponent(data.token);
    this.link = `${window.location.host}/${AppRoutePath.ANON_GALLERY_VIEW}?`
      + `collectionId=${collectionId}`
      + `&accessToken=${accessToken}`;
    this.cdr.detectChanges();
  }

  public copyLink(): void {
    const el = document.createElement('textarea');
    el.value = this.link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.successTooltip.show();
    setTimeout(() => this.successTooltip.hide(), 1000);
  }
}

import { Component, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-dynamic-loaded-image',
  templateUrl: './dynamic-loaded-image.component.html',
  styleUrls: ['./dynamic-loaded-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicLoadedImageComponent implements AfterViewInit, OnDestroy {

  @Input()
  private url: string;

  @ViewChild("imageElement", {static: true})
  private imageElmt: any;

  public imageURL: string;

  constructor(
    private httpService: HttpService,
  ) { }

  public ngAfterViewInit(): void {
    this.loadThumb();
  }

  public ngOnDestroy(): void {
    if (this.imageURL) {
      URL.revokeObjectURL(this.imageURL);
      this.imageURL = null;
    }
  }

  public async loadThumb(): Promise<void> {
    const res = await this.httpService.getReq({
      headers: {
        "Accept": "application/octet-stream",
      },
      path: this.url,
    });
    const elem = this.imageElmt.nativeElement;
    const imBytes = await res.blob();
    this.imageURL = URL.createObjectURL(imBytes);
    elem.src = this.imageURL;
  }

}

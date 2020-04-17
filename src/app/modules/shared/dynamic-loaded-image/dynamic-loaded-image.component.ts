import { Component, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-dynamic-loaded-image',
  templateUrl: './dynamic-loaded-image.component.html',
  styleUrls: ['./dynamic-loaded-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicLoadedImageComponent implements AfterViewInit {

  @Input()
  private url: string;

  @Input()
  private imageType: string;

  @ViewChild("imageElement", {static: true})
  private imageElmt: any;

  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngAfterViewInit(): void {
    this.loadThumb();
  }

  public async loadThumb(): Promise<void> {
    const res = await this.httpService.getReq({
      headers: {
        "Accept": "text/plain",
      },
      path: this.url,
    });
    const imageB64 = await res.text();
    const elem = this.imageElmt.nativeElement;
    elem.src = `data:image/${this.imageType.toLowerCase()};base64, `
      + imageB64;
    this.cdr.detectChanges();
  }

}

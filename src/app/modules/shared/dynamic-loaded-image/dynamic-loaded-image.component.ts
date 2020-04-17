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
      path: this.url,
    });
    const resData = await res.json();
    const elem = this.imageElmt.nativeElement;
    elem.src = "data:image/jpeg;base64, " + resData[0].thumb_b64;
    this.cdr.detectChanges();
  }

}

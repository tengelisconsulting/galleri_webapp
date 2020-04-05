import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-your-gallery-route',
  templateUrl: './your-gallery-route.component.html',
  styleUrls: ['./your-gallery-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YourGalleryRouteComponent {

  @ViewChild("fileInput", { static: true, })
  private fileElem: ElementRef;

  constructor(
    private httpService: HttpService,
  ) { }

  public upload(): void {
    const fileList = this.fileElem.nativeElement.files;
    if (!fileList || !fileList.length) {
      return;
    }
    const file = fileList[0];
    const data = new FormData();
    data.append("file_data", file);
    this.doUpload(file);
  }

  private async doUpload(data): Promise<void> {
    const result = await this.httpService.newImage(data);
    console.log("result: ", result);
  }

}

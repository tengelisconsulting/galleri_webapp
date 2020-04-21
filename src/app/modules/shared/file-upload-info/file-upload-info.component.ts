import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { v4 as uuidv4 } from "uuid";

import { HttpService } from 'src/app/core/http.service';
import { ImageDataService } from 'src/app/core/data/image-data.service';

@Component({
  selector: 'app-file-upload-info',
  templateUrl: './file-upload-info.component.html',
  styleUrls: ['./file-upload-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadInfoComponent implements OnInit {

  @Input()
  public file: File;

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onCreate: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDelete: EventEmitter<boolean> = new EventEmitter();

  public percentDone: number = 0;

  private imageId: string =  uuidv4();
  private imagePath: string = `/obj/image/${this.imageId}`;

  constructor(
    private httpService: HttpService,
    private imageDataService: ImageDataService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.onId.emit(this.imageId);
    this.uploadImage();
  }

  public async uploadImage(): Promise<void> {
    const uploadInfo = await this.imageDataService.getCreateImageUrl(
      this.imageId
    );
    const formData = new FormData();
    Object.keys(uploadInfo.fields).forEach((key) => {
      formData.append(key, uploadInfo.fields[key])
    });
    formData.append("file", this.file);
    this.httpService.upload(
      uploadInfo.url, formData
    )
      .subscribe(
        (progress) => this.onProgress(progress),
        null,
        () => this.onUploadComplete(uploadInfo)
      );
  }

  public async deleteImage(): Promise<void> {
    this.onDelete.emit(true);
    const res = await this.httpService.deleteReq({
      path: this.imagePath
    });
    if (!res.ok) {
      console.error("failed to delete image");
    }
  }

  private onProgress(progress: {loaded: number, total: number}): void {
    this.percentDone = (progress.loaded * 100.0 / progress.total);
    this.cdr.detectChanges();
  }

  private async onUploadComplete(uploadInfo): Promise<void> {
    const res = this.imageDataService.createImage(
      this.imageId, uploadInfo.url + uploadInfo.fields.key
    )
    this.onCreate.emit(this.imageId);
  }

}

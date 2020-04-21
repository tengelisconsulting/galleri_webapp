import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { v4 as uuidv4 } from "uuid";

import { HttpService } from 'src/app/core/http.service';
import { ImageDataService } from 'src/app/core/data/image-data.service';
import { ImageService } from 'src/app/ui/image.service';


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
  private imageB64: string;

  constructor(
    private httpService: HttpService,
    private imageDataService: ImageDataService,
    private imageService: ImageService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.onId.emit(this.imageId);
    this.uploadImage();
  }

  public async uploadImage(): Promise<void> {
    const uploadInfo = await this.imageDataService
      .getCreateImageUrl(this.imageId);
    const formData = new FormData();
    Object.keys(uploadInfo.fields).forEach((key) => {
      formData.append(key, uploadInfo.fields[key])
    });
    formData.append("file", this.file);
    Promise.all([
      this.upload(uploadInfo.url, formData),
      this.setImageB64(),
    ]).then(() => this.createImageRecord(
      uploadInfo.url + uploadInfo.fields.key
    ));
  }

  public async deleteImage(): Promise<void> {
    this.onDelete.emit(true);
    return this.imageDataService.deleteImage(this.imageId);
  }

  private async upload(url: string, data: FormData): Promise<void> {
    return new Promise((resolve, _reject) => {
      this.httpService.upload(url, data).subscribe(
        (progress) => this.onProgress(progress),
        null,
        () => resolve()
      );
    });
  }

  private onProgress(progress: {loaded: number, total: number}): void {
    this.percentDone = (progress.loaded * 100.0 / progress.total);
    this.cdr.detectChanges();
  }

  private async setImageB64(): Promise<void> {
    this.imageB64 = await this.imageService.getImageB64(
      this.file,
      ImageService.THUMBNAIL_HEIGHT,
      ImageService.THUMBNAIL_WIDTH,
      0.7
    );
  }

  private async createImageRecord(href: string): Promise<void> {
    const res = await this.imageDataService.createImage(
      this.imageId,
      href,
      this.imageB64
    );
    if (res.ok) {
      this.onCreate.emit(this.imageId);
    }
  }

}

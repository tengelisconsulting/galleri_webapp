import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { v4 as uuidv4 } from "uuid";
import { HttpService } from 'src/app/core/http.service';
import { ImageDataService } from 'src/app/core/data/image-data.service';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionComponent implements OnDestroy {

  @Output()
  public onComplete: EventEmitter<boolean> = new EventEmitter(); // true on success

  public collectionForm: FormGroup = new FormGroup({
    collectionName: new FormControl("", [
      Validators.required,
    ]),
  });

  public files: File[] = [];

  private imageIds: string[] = [];
  private isCreated: boolean = false;

  constructor(
    private httpService: HttpService,
    private imageDataService: ImageDataService,
    private spinnerService: SpinnerService,
  ) {}

  public ngOnDestroy(): void {
    if (!this.isCreated && this.imageIds.length) {
      this.imageIds.forEach((imageId) => this.imageDataService
                            .deleteOrphanImage(imageId));
    }
  }

  public onFile(file: File): void {
    this.files = this.files.concat(file);
  }

  public fileDeleted(index: number): void {
    const removeAtIndex = (list) => Array.prototype.concat(
      list.slice(0, index),
      list.slice(index + 1)
    );
    this.files = removeAtIndex(this.files);
    this.imageIds = removeAtIndex(this.imageIds);
  }

  public imageAdded(imageId: string): void {
    this.imageIds = this.imageIds.concat(imageId);
  }

  public async submit(): Promise<void> {
    if (!this.collectionForm.valid) {
      return;
    }
    if (!this.files.length) {
      return;
    }
    this.spinnerService.showSpinner();
    const res = await this.httpService.postReq({
      path: "/db/rpc/init_collection",
      data: {
        "p_collection_id": uuidv4(),
        "p_collection_name": this.collectionForm.value.collectionName,
        "p_image_ids": this.imageIds,
      },
    });
    this.spinnerService.hideSpinner();
    if (res.ok) {
      this.isCreated = true;
      this.onComplete.emit(true);
    }
  }

}

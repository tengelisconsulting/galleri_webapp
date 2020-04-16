import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { v4 as uuidv4 } from "uuid";
import { HttpService } from 'src/app/core/http.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionComponent {

  @Output()
  public onComplete: EventEmitter<boolean> = new EventEmitter(); // true on success

  public collectionForm: FormGroup = new FormGroup({
    collectionName: new FormControl("", [
      Validators.required,
    ]),
  });

  public files: File[] = [];

  private imageIds: string[] = [];

  constructor(
    private httpService: HttpService,
  ) { }

  public onFile(e: any): void {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) {
      return;
    }
    const selectedFile: File = e.target.files[0];
    this.files = this.files.concat(selectedFile);
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
    const res = await this.httpService.postReq({
      path: "/db/rpc/init_collection",
      data: {
        "p_obj_id": uuidv4(),
        "p_collection_name": this.collectionForm.value.collectionName,
        "p_image_ids": this.imageIds,
      },
    });
    if (res.ok) {
      this.onComplete.emit(true);
    }
  }

}

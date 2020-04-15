import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCollectionComponent {

  public collectionForm: FormGroup = new FormGroup({
    collectionName: new FormControl("", [
      Validators.required,
    ]),
  });

  public files: File[] = [];

  constructor() { }

  public onFile(e: any): void {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) {
      return;
    }
    const selectedFile: File = e.target.files[0];
    this.files = this.files.concat(selectedFile);
  }

  public fileDeleted(index: number): void {
    this.files = Array.prototype.concat(
      this.files.slice(0, index),
      this.files.slice(index + 1),
    )
  }

}

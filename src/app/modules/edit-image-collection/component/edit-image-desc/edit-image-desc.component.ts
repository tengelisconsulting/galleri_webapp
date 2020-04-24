import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ImageDataService } from 'src/app/core/data/image-data.service';


@Component({
  selector: 'app-edit-image-desc',
  templateUrl: './edit-image-desc.component.html',
  styleUrls: ['./edit-image-desc.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditImageDescComponent implements OnInit {

  @Input()
  public imageId: string;

  @Output()
  public onComplete: EventEmitter<boolean> = new EventEmitter();

  public imageForm: FormGroup = new FormGroup({
    description: new FormControl(""),
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private imageDataService: ImageDataService,
  ) { }

  ngOnInit() {
    this.imageForm.disable();
    Promise.all([
      this.loadImage()
    ]).then(() => {
      this.imageForm.enable();
    });
  }

  public async update(): Promise<void> {
    const newDescription = this.imageForm.value["description"];
    const res = await this.imageDataService.updateImage(
      this.imageId, { description: newDescription }
    );
    if (!res.ok) {
      console.error("failed to update image", this.imageId);
      return;
    }
    this.onComplete.emit(true);
  }

  public cancel(): void {
    this.onComplete.emit(false);
  }

  private async loadImage(): Promise<void> {
    const image = await this.imageDataService.getImage(this.imageId);
    this.imageForm.controls["description"].setValue(image.description);
    this.cdr.detectChanges();
  }

}

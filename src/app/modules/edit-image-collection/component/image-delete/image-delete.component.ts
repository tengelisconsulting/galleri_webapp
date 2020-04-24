import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ImageDataService } from 'src/app/core/data/image-data.service';

@Component({
  selector: 'app-image-delete',
  templateUrl: './image-delete.component.html',
  styleUrls: ['./image-delete.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDeleteComponent {

  @Input()
  public collectionId: string;

  @Input()
  public imageId: string;

  @Output()
  // true on confirm
  public onSubmit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private imageDataService: ImageDataService,
  ) { }

  public async confirm(): Promise<void> {
    await this.imageDataService.deleteImage(
      this.collectionId, this.imageId
    );
    this.onSubmit.emit(true);
  }

  public cancel(): void {
    this.onSubmit.emit(false);
  }
}

import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ImageDataService } from 'src/app/core/data/image-data.service';

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageThumbComponent implements OnInit {

  @Input()
  private imageId: string;

  public url: string;

  constructor(
    private imageDataService: ImageDataService,
  ) { }

  ngOnInit() {
    this.url = this.imageDataService.getImageThumbUrl(this.imageId);
  }

}

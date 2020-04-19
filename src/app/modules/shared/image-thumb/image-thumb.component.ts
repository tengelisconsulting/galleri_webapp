import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.url = `/db/user_image_thumb?image_id=eq.${this.imageId}&select=thumb`;
  }

}

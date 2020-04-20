import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload-btn',
  templateUrl: './file-upload-btn.component.html',
  styleUrls: ['./file-upload-btn.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadBtnComponent {

  @Input()
  public text: string;

  @Output()
  public onFile: EventEmitter<File> = new EventEmitter();

  constructor() { }

  public onInput(e: any): void {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) {
      return;
    }
    const selectedFile: File = e.target.files[0];
    this.onFile.emit(selectedFile);
  }

}

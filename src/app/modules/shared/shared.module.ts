import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDisplayComponent } from './collection-display/collection-display.component';
import { CollectionThumbComponent } from './collection-thumb/collection-thumb.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CreateCollectionModalComponent } from './create-collection-modal/create-collection-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadInfoComponent } from './file-upload-info/file-upload-info.component';
import { DynamicLoadedImageComponent } from './dynamic-loaded-image/dynamic-loaded-image.component';
import { RouterModule } from '@angular/router';
import { ImageThumbComponent } from './image-thumb/image-thumb.component';
import { FileUploadBtnComponent } from './file-upload-btn/file-upload-btn.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatButtonModule } from '@angular/material';
import { TopbarButtonComponent } from './topbar/topbar-button/topbar-button.component';



@NgModule({
  declarations: [
    CollectionDisplayComponent,
    CollectionThumbComponent,
    CreateCollectionComponent,
    CreateCollectionModalComponent,
    FileUploadInfoComponent,
    DynamicLoadedImageComponent,
    ImageThumbComponent,
    FileUploadBtnComponent,
    SpinnerComponent,
    TopbarButtonComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CollectionDisplayComponent,
    CollectionThumbComponent,
    DynamicLoadedImageComponent,
    FileUploadBtnComponent,
    FileUploadInfoComponent,
    ImageThumbComponent,
    SpinnerComponent,
    TopbarButtonComponent,
  ],
  entryComponents: [
    CreateCollectionModalComponent,
  ],
})
export class SharedModule { }

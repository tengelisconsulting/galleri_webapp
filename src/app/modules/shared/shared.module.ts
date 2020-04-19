import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDisplayComponent } from './collection-display/collection-display.component';
import { CollectionThumbComponent } from './collection-thumb/collection-thumb.component';
import { CollectionDisplayModalComponent } from './collection-display-modal/collection-display-modal.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CreateCollectionModalComponent } from './create-collection-modal/create-collection-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadInfoComponent } from './file-upload-info/file-upload-info.component';
import { DynamicLoadedImageComponent } from './dynamic-loaded-image/dynamic-loaded-image.component';
import { RouterModule } from '@angular/router';
import { ImageThumbComponent } from './image-thumb/image-thumb.component';



@NgModule({
  declarations: [
    CollectionDisplayComponent,
    CollectionThumbComponent,
    CollectionDisplayModalComponent,
    CreateCollectionComponent,
    CreateCollectionModalComponent,
    FileUploadInfoComponent,
    DynamicLoadedImageComponent,
    ImageThumbComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CollectionDisplayComponent,
    CollectionThumbComponent,
    DynamicLoadedImageComponent,
    ImageThumbComponent,
  ],
  entryComponents: [
    CollectionDisplayModalComponent,
    CreateCollectionModalComponent,
  ],
})
export class SharedModule { }

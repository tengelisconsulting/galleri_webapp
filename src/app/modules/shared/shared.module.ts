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
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TopbarButtonComponent } from './topbar/topbar-button/topbar-button.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { NewUserModalComponent } from './create-user/new-user-modal/new-user-modal.component';
import { SearchInputComponent } from './search/search-input/search-input.component';
import { CollectionListComponent } from './collection-list/collection-list.component';



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
    CreateUserComponent,
    NewUserModalComponent,
    SearchInputComponent,
    CollectionListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CollectionDisplayComponent,
    CollectionListComponent,
    CollectionThumbComponent,
    DynamicLoadedImageComponent,
    FileUploadBtnComponent,
    FileUploadInfoComponent,
    ImageThumbComponent,
    SearchInputComponent,
    SpinnerComponent,
    TopbarButtonComponent,
  ],
  entryComponents: [
    CreateCollectionModalComponent,
    NewUserModalComponent,
  ],
})
export class SharedModule { }

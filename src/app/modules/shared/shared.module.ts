import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDisplayComponent } from './collection-display/collection-display.component';
import { CollectionThumbComponent } from './collection-thumb/collection-thumb.component';
import { CollectionDisplayModalComponent } from './collection-display-modal/collection-display-modal.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CreateCollectionModalComponent } from './create-collection-modal/create-collection-modal.component';



@NgModule({
  declarations: [
    CollectionDisplayComponent,
    CollectionThumbComponent,
    CollectionDisplayModalComponent,
    CreateCollectionComponent,
    CreateCollectionModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollectionDisplayComponent,
    CollectionThumbComponent
  ],
  entryComponents: [
    CollectionDisplayModalComponent,
    CreateCollectionModalComponent,
  ],
})
export class SharedModule { }

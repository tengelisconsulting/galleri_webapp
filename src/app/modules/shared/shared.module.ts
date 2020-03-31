import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDisplayComponent } from './collection-display/collection-display.component';
import { CollectionThumbComponent } from './collection-thumb/collection-thumb.component';
import { CollectionDisplayModalComponent } from './collection-display-modal/collection-display-modal.component';



@NgModule({
  declarations: [
    CollectionDisplayComponent,
    CollectionThumbComponent,
    CollectionDisplayModalComponent,
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
  ],
})
export class SharedModule { }

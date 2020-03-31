import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionDisplayComponent } from './collection-display/collection-display.component';
import { CollectionThumbComponent } from './collection-thumb/collection-thumb.component';



@NgModule({
  declarations: [
    CollectionDisplayComponent,
    CollectionThumbComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CollectionDisplayComponent,
    CollectionThumbComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatIconModule, MatButtonModule } from "@angular/material";

import { EditImageCollectionRouteComponent } from './component/edit-image-collection-route/edit-image-collection-route.component';
import { SharedModule } from '../shared/shared.module';
import { EditImageCollectionRoutingModule } from './edit-image-collection-routing.module';
import { EditImageCollectionComponent } from './component/edit-image-collection/edit-image-collection.component';
import { EditImageDescComponent } from './component/edit-image-desc/edit-image-desc.component';
import { EditImageDescModalComponent } from './component/edit-image-desc-modal/edit-image-desc-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageDeleteComponent } from './component/image-delete/image-delete.component';
import { ImageDeleteModalComponent } from './component/image-delete-modal/image-delete-modal.component';
import { CollectionDeleteComponent } from './component/collection-delete/collection-delete.component';
import { CollectionDeleteModalComponent } from './component/collection-delete/collection-delete-modal/collection-delete-modal.component';



@NgModule({
  declarations: [
    EditImageCollectionRouteComponent,
    EditImageCollectionComponent,
    EditImageDescComponent,
    EditImageDescModalComponent,
    ImageDeleteComponent,
    ImageDeleteModalComponent,
    CollectionDeleteComponent,
    CollectionDeleteModalComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    EditImageCollectionRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
    CollectionDeleteModalComponent,
    EditImageDescModalComponent,
    ImageDeleteModalComponent,
  ],
})
export class EditImageCollectionModule { }

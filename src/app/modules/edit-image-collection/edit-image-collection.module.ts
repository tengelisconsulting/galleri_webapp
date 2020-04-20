import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditImageCollectionRouteComponent } from './component/edit-image-collection-route/edit-image-collection-route.component';
import { SharedModule } from '../shared/shared.module';
import { EditImageCollectionRoutingModule } from './edit-image-collection-routing.module';
import { EditImageCollectionComponent } from './component/edit-image-collection/edit-image-collection.component';
import { EditImageDescComponent } from './component/edit-image-desc/edit-image-desc.component';
import { EditImageDescModalComponent } from './component/edit-image-desc-modal/edit-image-desc-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditImageCollectionRouteComponent,
    EditImageCollectionComponent,
    EditImageDescComponent,
    EditImageDescModalComponent,
  ],
  imports: [
    CommonModule,
    EditImageCollectionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
    EditImageDescModalComponent,
  ],
})
export class EditImageCollectionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditImageCollectionRouteComponent } from './component/edit-image-collection-route/edit-image-collection-route.component';
import { SharedModule } from '../shared/shared.module';
import { EditImageCollectionRoutingModule } from './edit-image-collection-routing.module';



@NgModule({
  declarations: [
    EditImageCollectionRouteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EditImageCollectionRoutingModule,
  ]
})
export class EditImageCollectionModule { }

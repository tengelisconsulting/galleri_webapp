import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCollectionRouteComponent } from './components/image-collection-route/image-collection-route.component';
import { SharedModule } from '../shared/shared.module';
import { ImageCollectionRoutingModule } from './image-collection-routing.module';


@NgModule({
  declarations: [ImageCollectionRouteComponent],
  imports: [
    CommonModule,
    SharedModule,
    ImageCollectionRoutingModule,
  ]
})
export class ImageCollectionModule { }

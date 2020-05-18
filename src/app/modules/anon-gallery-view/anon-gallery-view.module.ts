import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonGalleryViewRouteComponent } from './components/anon-gallery-view-route/anon-gallery-view-route.component';
import { AnonGalleryViewRoutingModule } from './anon-gallery-view-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AnonGalleryViewRouteComponent,
  ],
  imports: [
    AnonGalleryViewRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class AnonGalleryViewModule { }

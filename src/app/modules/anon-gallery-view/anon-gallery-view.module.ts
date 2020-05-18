import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonGalleryViewRouteComponent } from './components/anon-gallery-view-route/anon-gallery-view-route.component';
import { AnonGalleryViewRoutingModule } from './anon-gallery-view-routing.module';



@NgModule({
  declarations: [AnonGalleryViewRouteComponent],
  imports: [
    AnonGalleryViewRoutingModule,
    CommonModule,
  ]
})
export class AnonGalleryViewModule { }

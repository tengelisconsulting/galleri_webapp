import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourGalleryRouteComponent } from './components/your-gallery-route/your-gallery-route.component';
import { YourGalleryRoutingModule } from './your-gallery-routing.module';


@NgModule({
  declarations: [YourGalleryRouteComponent],
  imports: [
    CommonModule,
    YourGalleryRoutingModule,
  ]
})
export class YourGalleryModule { }

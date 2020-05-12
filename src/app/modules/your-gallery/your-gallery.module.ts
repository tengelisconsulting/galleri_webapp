import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourGalleryRouteComponent } from './components/your-gallery-route/your-gallery-route.component';
import { YourGalleryRoutingModule } from './your-gallery-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    YourGalleryRouteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    YourGalleryRoutingModule,
  ]
})
export class YourGalleryModule { }

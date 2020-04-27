import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourImageCollectionRouteComponent } from './components/your-image-collection-route/your-image-collection-route.component';
import { YourImageCollectionRoutingModule } from './your-image-collection-routing.module';


@NgModule({
  declarations: [YourImageCollectionRouteComponent],
  imports: [
    CommonModule,
    YourImageCollectionRoutingModule,
  ]
})
export class YourImageCollectionModule { }

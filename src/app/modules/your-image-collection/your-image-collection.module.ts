import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourImageCollectionRouteComponent } from './components/your-image-collection-route/your-image-collection-route.component';
import { YourImageCollectionRoutingModule } from './your-image-collection-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [YourImageCollectionRouteComponent],
  imports: [
    CommonModule,
    SharedModule,
    YourImageCollectionRoutingModule,
  ]
})
export class YourImageCollectionModule { }

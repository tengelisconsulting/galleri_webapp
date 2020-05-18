import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YourImageCollectionRouteComponent } from './components/your-image-collection-route/your-image-collection-route.component';
import { YourImageCollectionRoutingModule } from './your-image-collection-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatBottomSheetModule, MatTooltipModule } from '@angular/material';
import { LinkDisplayComponent } from './components/link-display/link-display.component';


@NgModule({
  declarations: [
    YourImageCollectionRouteComponent,
    LinkDisplayComponent,
  ],
  entryComponents: [
    LinkDisplayComponent,
  ],
  imports: [
    MatTooltipModule,
    CommonModule,
    MatBottomSheetModule,
    SharedModule,
    YourImageCollectionRoutingModule,
  ]
})
export class YourImageCollectionModule { }

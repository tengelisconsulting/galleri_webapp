import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRouteComponent } from './components/collections-route/collections-route.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CollectionsRouteComponent],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule,
  ]
})
export class CollectionsModule { }

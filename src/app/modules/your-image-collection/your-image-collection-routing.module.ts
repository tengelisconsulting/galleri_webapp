import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourImageCollectionRouteComponent } from './components/your-image-collection-route/your-image-collection-route.component';


const routes: Routes = [
  {
    path: '',
    component: YourImageCollectionRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourImageCollectionRoutingModule { }

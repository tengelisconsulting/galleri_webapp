import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditImageCollectionRouteComponent } from './component/edit-image-collection-route/edit-image-collection-route.component';


const routes: Routes = [
  {
    path: '',
    component: EditImageCollectionRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditImageCollectionRoutingModule { }

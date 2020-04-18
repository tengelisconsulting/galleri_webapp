import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageCollectionRouteComponent } from './components/image-collection-route/image-collection-route.component';


const routes: Routes = [
  {
    path: '',
    component: ImageCollectionRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageCollectionRoutingModule { }

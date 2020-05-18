import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonGalleryViewRouteComponent } from './components/anon-gallery-view-route/anon-gallery-view-route.component';


const routes: Routes = [
  {
    path: '',
    component: AnonGalleryViewRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnonGalleryViewRoutingModule { }

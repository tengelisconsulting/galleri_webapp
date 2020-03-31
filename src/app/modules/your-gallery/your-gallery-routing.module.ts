import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YourGalleryRouteComponent } from './components/your-gallery-route/your-gallery-route.component';


const routes: Routes = [
  {
    path: '',
    component: YourGalleryRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourGalleryRoutingModule { }

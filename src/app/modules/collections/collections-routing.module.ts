import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionsRouteComponent } from './components/collections-route/collections-route.component';


const routes: Routes = [
  {
    path: '',
    component: CollectionsRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }

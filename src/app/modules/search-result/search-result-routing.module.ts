import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResultRouteComponent } from './components/search-result-route/search-result-route.component';


const routes: Routes = [
  {
    path: '',
    component: SearchResultRouteComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SearchResultRoutingModule { }

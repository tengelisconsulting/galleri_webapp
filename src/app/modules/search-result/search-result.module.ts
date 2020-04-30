import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultRouteComponent } from './components/search-result-route/search-result-route.component';
import { SearchResultRoutingModule } from './search-result-routing.module';



@NgModule({
  declarations: [SearchResultRouteComponent],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
  ]
})
export class SearchResultModule { }

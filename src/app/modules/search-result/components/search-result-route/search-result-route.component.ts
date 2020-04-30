import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';


@Component({
  selector: 'app-search-result-route',
  templateUrl: './search-result-route.component.html',
  styleUrls: ['./search-result-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultRouteComponent extends RouteComponent<{
  searchParams: string;
}> {

  constructor(
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
    this.appOnInit(() => {
      const searchParams = JSON.parse(
        atob(this.params.searchParams)
      );
      console.log("search params: ", searchParams);
    });
  }

}

import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { UserService } from 'src/app/core/data/user.service';
import { SearchParams } from 'src/app/types/SearchParams';


@Component({
  selector: 'app-search-result-route',
  templateUrl: './search-result-route.component.html',
  styleUrls: ['./search-result-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultRouteComponent extends RouteComponent<{
  searchParams: string;
}> {

  private searchParams: SearchParams;

  public users: string[] = [];

  constructor(
    cdr: ChangeDetectorRef,
    private userService: UserService,
  ) {
    super(cdr);
    this.appOnInit(() => {
      this.paramStream.subscribe((params) => {
        this.searchParams = JSON.parse(
          atob(params.searchParams)
        );
        this.loadUserMatches();
      });
    })
  }

  private async loadUserMatches(): Promise<void> {
    this.users = await this.userService.searchUserNames(
      this.searchParams.searchTerm + "*"
    );
    this.cdr.detectChanges();
  }

}

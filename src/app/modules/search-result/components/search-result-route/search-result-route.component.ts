import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { UserService } from 'src/app/core/data/user.service';
import { SearchParams } from 'src/app/types/SearchParams';
import { Router } from '@angular/router';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';


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
    private router: Router,
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

  public navToCollections(
    username: string
  ): void {
    this.router.navigate([
      AppRoutePath.APP_PREFIX, AppRoutePath.COLLECTIONS
    ], {
      queryParams: {
        user: username.toUpperCase(),
      },
    });
  }

  private async loadUserMatches(): Promise<void> {
    this.users = await this.userService.searchUserNames(
      this.searchParams.searchTerm.toUpperCase() + "*"
    );
    this.cdr.detectChanges();
  }

}

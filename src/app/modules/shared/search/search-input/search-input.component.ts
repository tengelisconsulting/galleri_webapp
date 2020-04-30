import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  public searchForm = new FormGroup({
    searchTerm: new FormControl("")
  })

  @Output()
  public onSubmit: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private router: Router,
  ) { }

  public async search(): Promise<void> {
    const paramsObj = {
      searchTerm: this.searchForm.value,
    };
    const paramsS = JSON.stringify(paramsObj);
    const encoded = btoa(paramsS);
    this.router.navigate([
      AppRoutePath.APP_PREFIX, AppRoutePath.SEARCH_RESULT
    ], {
      queryParams: {
        searchParams: encoded,
      },
    });
    this.onSubmit.emit(true);
  }

}

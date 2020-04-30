import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent extends BaseComponent {
  public searchForm = new FormGroup({
    searchTerm: new FormControl("")
  })

  @Input()
  public isFocused: boolean = false;

  @Output()
  public onSubmit: EventEmitter<boolean> = new EventEmitter();

  @ViewChild("termInput", {static: true})
  private termInput: ElementRef;

  constructor(
    private router: Router,
  ) {
    super();
    this.appOnInit(() => {
      this.change$.pipe(
        filter((change) => change["isFocused"].currentValue)
      ).subscribe(() => this.focus())
    });
  }

  public async search(): Promise<void> {
    const paramsObj = {
      searchTerm: this.searchForm.value.searchTerm,
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

  private focus(): void {
    this.termInput.nativeElement.focus();
  }
}

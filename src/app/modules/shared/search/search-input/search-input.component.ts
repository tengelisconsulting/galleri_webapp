import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


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
  
  constructor() { }

  public async search(): Promise<void> {
    console.log("searching for input:", this.searchForm.value);
  }

}

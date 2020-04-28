import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

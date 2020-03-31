import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-landing-route',
  templateUrl: './landing-route.component.html',
  styleUrls: ['./landing-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

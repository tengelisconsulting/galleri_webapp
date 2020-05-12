import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { RouteComponent } from 'src/app/core/routing/RouteComponent';
import { UserService } from 'src/app/core/data/user.service';


@Component({
  selector: 'app-collections-route',
  templateUrl: './collections-route.component.html',
  styleUrls: ['./collections-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionsRouteComponent extends RouteComponent<{
  user: string;
}> {

  public userId: string;

  constructor(
    cdr: ChangeDetectorRef,
    private userService: UserService,
  ) {
    super(cdr);
    this.paramStream.subscribe(async (params) => {
      this.userId = await this.userService.getUserId(params.user)
    });
  }

}

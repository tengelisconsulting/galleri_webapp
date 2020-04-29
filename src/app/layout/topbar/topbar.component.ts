import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as db from "../../types/auto/db";
type user_account = db.OpenAPI2.user_account;

import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { TopbarService } from './topbar.service';
import { TopbarButtonComponent } from 'src/app/modules/shared/topbar/topbar-button/topbar-button.component';
import { AppLoadService } from 'src/app/core/app-load.service';
import { UserService } from 'src/app/core/data/user.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent extends BaseComponent {

  public extraButtons: TopbarButtonComponent[] = [];

  public user: user_account;

  constructor(
    private apploadService: AppLoadService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private topbarService: TopbarService,
  ) {
    super();
    this.loadUser();
    this.topbarService.getButton$(this.isDestroyed$)
      .subscribe((buttons) => {
        this.extraButtons = buttons;
        this.cdr.detectChanges();
      });
  }

  public async logout(): Promise<void> {
    this.apploadService.unload();
  }

  private async loadUser(): Promise<void> {
    this.user = await this.userService.getUser();
  }

}

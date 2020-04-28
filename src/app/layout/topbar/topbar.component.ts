import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { TopbarService } from './topbar.service';
import { TopbarButtonComponent } from 'src/app/modules/shared/topbar/topbar-button/topbar-button.component';
import { AppLoadService } from 'src/app/core/app-load.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent extends BaseComponent {

  public extraButtons: TopbarButtonComponent[] = [];

  constructor(
    private apploadService: AppLoadService,
    private cdr: ChangeDetectorRef,
    private topbarService: TopbarService,
  ) {
    super();
    this.topbarService.getButton$(this.isDestroyed$)
      .subscribe((buttons) => {
        this.extraButtons = buttons;
        this.cdr.detectChanges();
      });
  }

  public async logout(): Promise<void> {
    this.apploadService.unload();
  }

  public async newUserModal(): Promise<void> {
    console.log("create new user");
  }

}

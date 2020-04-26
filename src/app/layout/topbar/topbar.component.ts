import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { ModalService } from 'src/app/ui/modal.service';
import { CreateCollectionModalComponent } from 'src/app/modules/shared/create-collection-modal/create-collection-modal.component';
import { AppRoutePath } from 'src/app/core/routing/AppRoutePath';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { RouterService } from 'src/app/core/routing/router.service';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent extends BaseComponent {

  private showButtons: {[index: string]: boolean} = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: ModalService,
    private routerService: RouterService,
  ) {
    super();
    this.routerService.getActiveAppPathStream(this.isDestroyed$)
      .subscribe((activePath) => this.applyRoute(activePath));
  }

  public openCreateCollectionModal(): void {
    this.modalService.showModal({
      component: CreateCollectionModalComponent,
    });
  }

  private applyRoute(path: AppRoutePath): void {
    this.showButtons = {};
    this.getButtonsForRoute(path)
      .forEach((button) => this.showButtons[button] = true);
    this.cdr.detectChanges();
  }

  private getButtonsForRoute(path: AppRoutePath): string[] {
    switch (path) {
      case AppRoutePath.IMAGE_COLLECTION:
        return ["edit-collection"];
      default:
        return [];
    }
  }

}

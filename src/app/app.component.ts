import { Component, ChangeDetectionStrategy, Injector, ChangeDetectorRef } from '@angular/core';
import { AppLoadService } from './core/app-load.service';
import { SpinnerService } from './modules/shared/spinner/spinner.service';
import { BaseComponent } from './core/framework/component/BaseComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent {
  public title = 'webapp';

  public static injector: Injector;

  public showSpinner: boolean = false;

  constructor(
    private appLoadService: AppLoadService,
    private cdr: ChangeDetectorRef,
    private spinnerService: SpinnerService,
  ) {
    super();
    this.init();
    this.appOnInit(() => {
      this.spinnerService.getStateStream(this.isDestroyed$)
        .subscribe((spinnerState) => {
          this.showSpinner = spinnerState.isVisible;
          this.cdr.detectChanges();
        });
    });
  }

  private async init(): Promise<void> {
    // all initialization logic should be triggered in this method
    await this.appLoadService.startupAttemptOnAppLoad();

    // setTimeout(() => this.turnOnDebugCss(), 1000);
  }

  public turnOnDebugCss(): void {
    [].forEach.call(
      document.querySelectorAll("*"),
      function(a) {
        a.style.outline="1px solid #" +
          (~~(Math.random()*(1<<24))).toString(16)
      });
  }

}

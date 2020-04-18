import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppLoadService } from './core/app-load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title = 'webapp';

  constructor(
    private appLoadService: AppLoadService,
  ) {
    this.init();
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

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent extends BaseComponent {

  public userForm: FormGroup = new FormGroup({
    username: new FormControl("", [
      Validators.required,
    ]),
    password: new FormControl("", [
      Validators.required,
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
    ]),
  });

  public errorMsg: string;

  constructor() {
    super();
    this.appOnInit(() => {
      this.userForm.valueChanges.pipe(takeUntil(this.isDestroyed$))
        .subscribe((changes) => {
          console.log("changes", changes);
        });
    });
  }

  public async createUser(): Promise<void> {

  }

  private async checkUsernameValid(username: string): Promise<void> {

  }

}

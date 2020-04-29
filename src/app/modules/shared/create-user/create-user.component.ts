import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { UserService } from 'src/app/core/data/user.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserComponent extends BaseComponent {

  @Output()
  public onComplete: EventEmitter<{
    username: string,
    password: string,
  }> = new EventEmitter(); // true on success

  public userForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
  });

  public errors: string[] = [];

  private allUsernames: string[] = [];

  constructor(
    private userService: UserService,
  ) {
    super();
    this.userForm.disable();
    this.appOnInit(async () => {
      await this.loadUsernames();
      this.setValidators();
      this.userForm.enable();
    });
  }

  public async createUser(): Promise<void> {
    if (this.userForm.status !== "VALID") {
      return;
    }
    this.userForm.disable();
    const username = this.userForm.controls["username"].value;
    const password = this.userForm.controls["password"].value
    const res = await this.userService.createUser(username, password);
    this.userForm.enable();
    if (!res.ok) {
      console.error("failed to create user");
    }
    this.onComplete.emit({
      username: username,
      password: password,
    });
  }

  private setValidators(): void {
    this.userForm.controls["username"].setValidators([
      Validators.required,
      this.validateUsername.bind(this),
    ]);
    this.userForm.controls["password"].setValidators([
      Validators.required,
    ]);
    this.userForm.controls["confirmPassword"].setValidators([
      Validators.required,
      this.validateConfirmPw.bind(this),
    ]);
  }

  private validateUsername(
    control: AbstractControl
  ): {[key: string]: string[]} {
    if (this.allUsernames.includes(control.value.toUpperCase())) {
      return { errorMsg: ["Username is not unique"] };
    }
    return null;
  }

  private validateConfirmPw(
    control: AbstractControl
  ): {[key: string]: string[]} {
    if (control.value !== this.userForm.controls["password"].value) {
      return {
        errorMsg: ["Passwords do not match"],
      };
    }
    return null;
  }

  private async loadUsernames(): Promise<void> {
    this.allUsernames = await this.userService.getAllUsernames();
  }


}

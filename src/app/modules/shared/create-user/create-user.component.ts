import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BaseComponent } from 'src/app/core/framework/component/BaseComponent';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/core/data/user.service';

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
      this.validateUsername.bind(this),
    ]),
    password: new FormControl("", [
      Validators.required,
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
    ]),
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
      this.userForm.enable();
    });
  }

  public async createUser(): Promise<void> {
    const res = await this.userService.createUser(
      this.userForm.controls["username"].value,
      this.userForm.controls["password"].value
    );
    if (!res.ok) {
      console.error("failed to create user");
    }
    console.log("success!");
  }

  private validateUsername(
    control: AbstractControl
  ): {[key: string]: string[]}  {
    const allUsernames = this.allUsernames || [];
    if (allUsernames.includes(control.value.toUpperCase())) {
      return { errorMsg: ["Username is not unique"] };
    }
    return null;
  }

  private async loadUsernames(): Promise<void> {
    this.allUsernames = await this.userService.getAllUsernames();
  }


}

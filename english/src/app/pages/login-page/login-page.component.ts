import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {PasswordValidator} from "./utilities/password.validator";
import {BehaviorSubject} from "rxjs";

export class ErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface ILoginForm {
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  passwordVisibility = new BehaviorSubject(false);
  form: FormGroup;
  matcher = new ErrorStateMatcher();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      firstName: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, PasswordValidator]),
    })
  }

  changeVisibility($event: MouseEvent) {
    $event.preventDefault();
    this.passwordVisibility.next(!this.passwordVisibility.value)
  }

  async submitForm(formValue: ILoginForm): Promise<void> {
    console.log(formValue);
  }

  clear($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.form.reset();
  }
}

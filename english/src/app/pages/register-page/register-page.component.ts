import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {PasswordValidator} from "./utilities/password.validator";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../auth/auth.service";

export class ErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface IRegisterForm {
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  passwordVisibility = new BehaviorSubject(false);
  form: FormGroup;
  matcher = new ErrorStateMatcher();

  constructor(private fb: FormBuilder,
              private auth: AuthService) {
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
    this.passwordVisibility.next(!this.passwordVisibility.value);
  }

  async submitForm(formValue: IRegisterForm): Promise<void> {
    try {
      await this.auth.register(formValue).toPromise();
    } catch (e) {
      console.error(e);
    }
  }

  clear($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.form.reset();
  }
}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  form: FormGroup;
  passwordVisibility = new BehaviorSubject(false);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: '',
      password: '',
    })
  }

  submitForm(value: any) {

  }
  changeVisibility($event: MouseEvent) {
    $event.preventDefault();
    this.passwordVisibility.next(!this.passwordVisibility.value)
  }
}

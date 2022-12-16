import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  form: FormGroup;
  passwordVisibility = new BehaviorSubject(false);

  constructor(private fb: FormBuilder,
              private auth: AuthService) {
    this.form = this.fb.group({
      username: '',
      password: '',
    })
  }

  async submitForm(value: any) {
    try {
      await this.auth.login(value).toPromise();
    }catch (e) {
      console.error(e);
    }
  }
  changeVisibility($event: MouseEvent) {
    $event.preventDefault();
    this.passwordVisibility.next(!this.passwordVisibility.value)
  }
}

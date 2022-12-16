import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {IRegisterForm} from "../pages/register-page/register-page.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public login(data: { username: string; password: string; }): Observable<{ token: string, username: string }> {
    return this.httpClient.post<{ token: string, username: string }>("http://localhost:10051/api/v1/auth/login", data)
      .pipe(tap(e => localStorage.setItem('token', e.token)));
  }

  register(data: IRegisterForm): Observable<any> {
    return this.httpClient.post<any>("http://localhost:10051/api/v1/auth/register", data);
  }


}

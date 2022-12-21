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

  public getToken(): string {
    let token;
    try {
      token = localStorage.getItem('token');
    } catch (e) {
      console.log("no auth token");
    }
    return token ? token : "";
  }

  public refreshAuthToken(): Observable<{ token: string, username: string }> {
    return new Observable<{token: string; username: string}>();
  }

  public login(data: { username: string; password: string; }): Observable<{ token: string, username: string }> {
    return this.httpClient.post<{ token: string, username: string }>("http://localhost:10051/api/auth/login", data)
      .pipe(tap(e => localStorage.setItem('token', e.token)));
  }

  register(data: IRegisterForm): Observable<any> {
    return this.httpClient.post<any>("http://localhost:10051/api/auth/register", data);
  }
}

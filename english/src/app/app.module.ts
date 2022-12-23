import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {SideNavBarComponent} from './common-components/side-nav-bar/side-nav-bar.component';
import {MatListModule} from '@angular/material/list';
import {PageNotFoundComponentComponent} from './pages/page-not-found-component/page-not-found-component.component';
import {Overlay} from "@angular/cdk/overlay";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {MatInputModule} from "@angular/material/input";
import {TaskListModule} from "./pages/tasks-list/task-list.module";
import {TaskListRoutingModule} from "./pages/tasks-list/task-list-routing.module";
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {WordsManipulationsModule} from "./pages/words-manipulations/words-manipulations.module";
import {WordsManipulationsRoutingModule} from "./pages/words-manipulations/words-manipulations-routing.module";
import {AddWordComponent} from "./pages/words-manipulations/manipulations/add-word/add-word.component";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SideNavBarComponent,
    PageNotFoundComponentComponent,
    RegisterPageComponent,
    LoginPageComponent,
  ],
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    MatRadioModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    TaskListModule,
    TaskListRoutingModule,
    WordsManipulationsModule,
    WordsManipulationsRoutingModule
  ],
  exports: [
    CommonModule,
    TaskListRoutingModule,
    WordsManipulationsRoutingModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [MatDrawerContainer, Overlay, MatSnackBar, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

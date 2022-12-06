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
import {ChooseWordTaskComponent} from './pages/tasks/choose-word-task/choose-word-task.component';
import {TasksListComponent} from './pages/tasks-list/tasks-list.component';
import {Overlay} from "@angular/cdk/overlay";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SideNavBarComponent,
    PageNotFoundComponentComponent,
    ChooseWordTaskComponent,
    TasksListComponent,
    LoginPageComponent,
    RegistrationPageComponent,
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
    ReactiveFormsModule
  ],
  exports: [],
  providers: [MatDrawerContainer, Overlay, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}

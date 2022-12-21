import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {PageNotFoundComponentComponent} from "./pages/page-not-found-component/page-not-found-component.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '404', component: PageNotFoundComponentComponent},
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks-list/task-list-routing.module').then(m => m.TaskListRoutingModule)
  },
  {
    path: 'manipulations',
    loadChildren: () => import('./pages/words-manipulations/words-manipulations-routing.module').then(m => m.WordsManipulationsRoutingModule)
  },
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

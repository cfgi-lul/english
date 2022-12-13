import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {PageNotFoundComponentComponent} from "./pages/page-not-found-component/page-not-found-component.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'login', component: RegisterPageComponent},
  {path: '404', component: PageNotFoundComponentComponent},
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks-list/task-list/task-list-routing.module').then(m => m.TaskListRoutingModule)
  },
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

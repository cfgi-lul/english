import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {PageNotFoundComponentComponent} from "./pages/page-not-found-component/page-not-found-component.component";
import {ChooseWordTaskComponent} from "./pages/tasks/choose-word-task/choose-word-task.component";
import {TasksListComponent} from "./pages/tasks-list/tasks-list.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginPageComponent},
  {
    path: 'tasks',
    component: TasksListComponent,

    children: [
      {path: 'choose-word', component: ChooseWordTaskComponent},
      {path: '**', redirectTo: '/tasks'}
    ]
  },
  {path: '404', component: PageNotFoundComponentComponent},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {PageNotFoundComponentComponent} from "./pages/page-not-found-component/page-not-found-component.component";
import {ChooseWordTaskComponent} from "./pages/choose-word-task/choose-word-task.component";
import {TasksListComponent} from "./pages/tasks-list/tasks-list.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: '**', component: PageNotFoundComponentComponent},
  {path: './tasks/choose-word', component: ChooseWordTaskComponent},
  {path: './tasks', component: TasksListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

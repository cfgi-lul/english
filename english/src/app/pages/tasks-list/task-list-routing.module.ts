import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksListComponent} from "./tasks-list/tasks-list.component";
import {ChooseWordTaskComponent} from "./tasks/choose-word-task/choose-word-task.component";

const routes: Routes = [
  {path: '', component: TasksListComponent},
  {path: 'choose-word', component: ChooseWordTaskComponent},
  {path: '**', redirectTo: '/tasks'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskListRoutingModule {
}

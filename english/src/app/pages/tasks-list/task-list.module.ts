import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskListRoutingModule} from './task-list-routing.module';
import {TasksListComponent} from "./tasks-list/tasks-list.component";
import {ChooseWordTaskComponent} from "./tasks/choose-word-task/choose-word-task.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    TasksListComponent,
    ChooseWordTaskComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
  ]
})
export class TaskListModule {
}

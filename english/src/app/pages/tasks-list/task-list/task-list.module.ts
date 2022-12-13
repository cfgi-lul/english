import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListRoutingModule } from './task-list-routing.module';
import {TasksListComponent} from "../tasks-list.component";


@NgModule({
  declarations: [TasksListComponent],
  imports: [
    CommonModule,
    TaskListRoutingModule,

  ]
})
export class TaskListModule { }

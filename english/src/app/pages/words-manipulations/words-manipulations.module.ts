import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WordsManipulationsComponent} from './words-manipulations/words-manipulations.component';
import {AddWordComponent} from './manipulations/add-word/add-word.component';
import {WordsListComponent} from './manipulations/words-list/words-list.component';
import {MatButtonModule} from "@angular/material/button";
import {TaskListRoutingModule} from "../tasks-list/task-list-routing.module";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    WordsManipulationsComponent,
    AddWordComponent,
    WordsListComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ]
})
export class WordsManipulationsModule {
}

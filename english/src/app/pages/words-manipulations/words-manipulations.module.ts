import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsManipulationsRoutingModule } from './words-manipulations-routing.module';
import { WordsManipulationsComponent } from './words-manipulations/words-manipulations.component';
import { AddWordComponent } from './manipulations/add-word/add-word.component';
import { WordsListComponent } from './manipulations/words-list/words-list.component';


@NgModule({
  declarations: [
    WordsManipulationsComponent,
    AddWordComponent,
    WordsListComponent
  ],
  imports: [
    CommonModule,
    WordsManipulationsRoutingModule
  ]
})
export class WordsManipulationsModule { }

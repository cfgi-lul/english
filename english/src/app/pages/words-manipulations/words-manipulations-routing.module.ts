import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WordsManipulationsComponent} from "./words-manipulations/words-manipulations.component";
import {AddWordComponent} from "./manipulations/add-word/add-word.component";
import {WordsListComponent} from "./manipulations/words-list/words-list.component";

const routes: Routes = [
  {path: '', component: WordsManipulationsComponent},
  {path: 'add', component: AddWordComponent},
  {path: 'words-list', component: WordsListComponent},
  {path: '**', redirectTo: '/manipulations'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsManipulationsRoutingModule {
}

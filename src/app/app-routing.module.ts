import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {PageNotFoundComponentComponent} from "./pages/page-not-found-component/page-not-found-component.component";

const routes: Routes = [
  {path: 'start', component: MainPageComponent},
  {path: '**', component: PageNotFoundComponentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapterOnlyComponent } from './chapter-only/chapter-only.component';

const routes: Routes = [
  {
    path: 'chapter-only',
    component: ChapterOnlyComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }

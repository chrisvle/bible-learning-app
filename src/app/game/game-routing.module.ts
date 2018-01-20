import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapterOnlyComponent } from './chapter-only/chapter-only.component';
import { ChapterMcComponent } from './chapter-mc/chapter-mc.component';

const routes: Routes = [
  {
    path: 'chapter-only',
    component: ChapterOnlyComponent
  },
  {
    path: 'chapter-mc',
    component: ChapterMcComponent
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChapterOnlyComponent } from './chapter-only/chapter-only.component';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  declarations: [
    ChapterOnlyComponent
  ]
})
export class GameModule { }

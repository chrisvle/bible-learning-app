import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChapterOnlyComponent } from './chapter-only/chapter-only.component';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule
  ],
  declarations: [
    ChapterOnlyComponent
  ]
})
export class GameModule { }

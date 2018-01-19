import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChapterOnlyComponent } from './chapter-only/chapter-only.component';
import { GameRoutingModule } from './game-routing.module';
import { ChapterMcComponent } from './chapter-mc/chapter-mc.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule
  ],
  declarations: [
    ChapterOnlyComponent,
    ChapterMcComponent
  ]
})
export class GameModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChapterOnlyComponent } from './chapter-only/chapter-only.component';
import { GameRoutingModule } from './game-routing.module';
import { FocusModule } from 'angular2-focus';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    FormsModule,
    FocusModule.forRoot()
  ],
  declarations: [
    ChapterOnlyComponent
  ]
})
export class GameModule { }

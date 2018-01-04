import { Component, OnInit } from '@angular/core';
import { BibleService } from '../shared/services/bible.service';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import { GameType } from '../shared/models/game-type.model';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  gameType: string;
  oldOrNew: string;
  bibleBook: string;
  gameTypes: FirebaseListObservable<GameType[]>;
  oldTestamentBooks = [];
  newTestamentBooks = [];

  constructor(
    private bibleService: BibleService,
    private dashboardService: DashboardService
  ) {
    this.gameTypes = dashboardService.getGameTypes();
    this.oldTestamentBooks = bibleService.getOldTestamentBooks();
    this.newTestamentBooks = bibleService.getNewTestamentBooks();
  }

  setGameType(type: string): void {
    this.gameType = type;
  }

  resetAll(): void {
    this.gameType = null;
    this.oldOrNew = null;
    this.bibleBook = null;
  }
}

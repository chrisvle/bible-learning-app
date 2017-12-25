import { Component, OnInit } from '@angular/core';
import { BibleService } from '../shared/bible.service';
import { DashboardService } from './dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  gameType: string;
  oldOrNew: string;
  bibleBook: string;
  gameTypes = [];
  oldTestamentBooks = [];
  newTestamentBooks = [];

  constructor(
    private bibleServie: BibleService,
    private dashboardService: DashboardService
  ) {
    this.gameTypes = dashboardService.getGameTypes();
    this.oldTestamentBooks = bibleServie.getOldTestamentBooks();
    this.newTestamentBooks = bibleServie.getNewTestamentBooks();
  }

  setGameType(id: number): void {
    this.gameType = this.gameTypes[id].type;
  }

  resetAll(): void {
    this.gameType = null;
    this.oldOrNew = null;
    this.bibleBook = null;
  }
}

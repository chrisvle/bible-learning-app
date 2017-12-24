import { Component, OnInit } from '@angular/core';
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

  constructor(private dashboardService: DashboardService) {
    this.gameTypes = dashboardService.getGameTypes();
  }

  setGameType(id: number): void {
    this.gameType = this.gameTypes[id].type;
  }

  reset(): void {
    this.gameType = null;
    this.oldOrNew = null;
    this.bibleBook = null;
  }
}

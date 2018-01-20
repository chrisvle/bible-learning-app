import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BibleService } from '../shared/services/bible.service';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import { GameType } from '../shared/models/game-type.model';
import { BibleBook } from '../shared/models/bible-book.model';
import { GameTypes } from '../shared/enums/game-types.enum';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  gameType: string;
  gameTypeId: number;
  oldOrNew: string;
  bibleBook: string;
  gameTypes$: FirebaseListObservable<GameType[]>;
  oldTestamentBooks$: Observable<BibleBook[]>;
  newTestamentBooks$: Observable<BibleBook[]>;

  constructor(
    private bibleService: BibleService,
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.gameTypes$ = dashboardService.getGameTypes();
  }

  setGameType(type: string, id: number): void {
    this.gameType = type;
    this.gameTypeId = id;
    if (id === GameTypes.ChapterOnly) {
      this.oldTestamentBooks$ = this.bibleService.getOldTestamentBooks({ filterOutOneChapterBooks: true });
      this.newTestamentBooks$ = this.bibleService.getNewTestamentBooks({ filterOutOneChapterBooks: true });
    } else {
      this.oldTestamentBooks$ = this.bibleService.getOldTestamentBooks();
      this.newTestamentBooks$ = this.bibleService.getNewTestamentBooks();
    }
  }

  resetAll(): void {
    this.gameType = null;
    this.gameTypeId = null;
    this.oldOrNew = null;
    this.bibleBook = null;
  }

  playNow(): void {
    if (this.gameTypeId === GameTypes.ChapterOnly) {
      this.router.navigate(['/game/chapter-only'], { queryParams: { book: this.bibleBook}, skipLocationChange: true });
    }
    else if (this.gameTypeId === GameTypes.ChapterMC) {
      this.router.navigate(['/game/chapter-mc'], { queryParams: { book: this.bibleBook}, skipLocationChange: true });
    }
  }
}

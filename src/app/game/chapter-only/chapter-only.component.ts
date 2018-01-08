import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BibleService } from '../../shared/services/bible.service';

@Component({
  templateUrl: './chapter-only.component.html',
  styleUrls: ['./chapter-only.component.scss']
})
export class ChapterOnlyComponent implements OnInit {

  book: string;
  longestStreak = 0;
  correctAnswers = 0;
  totalQuestions = 0;

  chapterNumber$: Observable<number>;
  randomVerse$: any;

  constructor(private ar: ActivatedRoute, private router: Router, private bibleService: BibleService) {
    this.book = this.ar.snapshot.queryParams['book'];
    this.router.navigateByUrl('/game/chapter-only');
    this.randomVerse$ = bibleService.getRandomVerse(this.book);
  }

  ngOnInit() {
    // if (!this.book) {
    //   this.router.navigateByUrl('/dashboard');
    // }
  }

  incrementStreak() {
    this.longestStreak++;
  }

  incrementCorrectAnswers() {
    this.correctAnswers++;
  }

  incrementTotalQuestions() {
    this.totalQuestions++;
  }

  resetGameStats() {
    this.longestStreak = 0;
    this.correctAnswers = 0;
    this.totalQuestions = 0;
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BibleService } from '../../shared/services/bible.service';
import { AttemptStatuses } from '../../shared/enums/attempt-status.enum';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './chapter-mc.component.html',
  styleUrls: ['./chapter-mc.component.scss']
})
export class ChapterMcComponent implements OnInit {

  book: string;
  currentStreak = 0;
  longestStreak = 0;
  correctAnswers = 0;
  totalQuestions = 0;
  correct: boolean;
  attempt: boolean;

  attemptInput = '';
  showCorrectChapterAlert = false;
  showCorrectChapterButton = true;

  verseMetadata$: Observable<any>;
  verse: string;
  chapter: string;
  options: String[];

  constructor(private ar: ActivatedRoute, private router: Router, private bibleService: BibleService) {
    this.correct = false;
    this.attempt = false;
    this.book = this.ar.snapshot.queryParams['book'];
    this.router.navigateByUrl('/game/chapter-mc');
    this.getRandomVerse();
  }

  ngOnInit() {
    if (!this.book) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  resetGameStats() {
    this.currentStreak = 0;
    this.correctAnswers = 0;
    this.totalQuestions = 0;
    this.longestStreak = 0;
  }

  resetUI() {
    this.showCorrectChapterAlert = false;
    this.showCorrectChapterButton = true;
    this.correct = false;
    this.attempt = false;
    this.attemptInput = '';
  }

  getRandomVerse() {
    this.verseMetadata$ = this.bibleService.getRandomVerse(this.book);
    this.verseMetadata$.subscribe(metadata => {
      this.verse = metadata.verse;
      this.chapter = metadata.chapter;
      this.options = metadata.options;
;
    });
    this.resetUI();
  }

  submit() {
    this.attempt = true;
    if (this.attemptInput === '') {
      this.attemptInput = this.options[0].toString();
    }
    if (this.attemptInput === this.chapter) {
      this.correct = true;
      this.correctAnswers++;
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak;
      }
    } else {
      this.currentStreak = 0;
      this.correct = false;
    }
    this.totalQuestions++;
  }

  showCorrectChapter() {
    this.showCorrectChapterAlert = true;
    this.showCorrectChapterButton = false;
  }

  selectChoice(choice: string) {
    this.attemptInput = choice;
  }

  isChecked(choice: string) {
    return this.attemptInput === choice;
  }
}

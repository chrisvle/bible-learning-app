import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BibleService } from '../../shared/services/bible.service';
import { AttemptStatuses } from '../../shared/enums/attempt-status.enum';

@Component({
  templateUrl: './chapter-only.component.html',
  styleUrls: ['./chapter-only.component.scss']
})
export class ChapterOnlyComponent implements OnInit {

  book: string;
  maxChapter: number = null;
  verseMetadata$: Observable<any>;
  verse: string;
  chapter: number;
  verseNumber: number;
  lastVerseNumber: number;

  @ViewChild('attempt') attemptElement: ElementRef;
  attemptOne = AttemptStatuses.Unused;
  attemptTwo = AttemptStatuses.Unused;
  attemptThree = AttemptStatuses.Unused;
  currentAttempt = 1;
  attemptInput = '';
  incorrectGuesses: string[] = [];
  noMoreAttempts = false;
  showCorrectChapterAlert = false;
  showCorrectChapterButton = true;
  showHelpButton = false;

  // Data
  currentStreak = 0;
  longestStreak = 0;
  correctAnswers = 0;
  totalQuestions = 0;

  constructor(private ar: ActivatedRoute, private router: Router, private bibleService: BibleService) {
  }

  ngOnInit() {
    this.ar.queryParams.subscribe(params => {
      if (params["book"]) {
        if (params["maxChapter"]) {
          this.maxChapter = params["maxChapter"];
        }
        this.book = params["book"];
        console.log(this.maxChapter);
        this.bibleService.getRandomVerse(this.book, this.maxChapter)
          .then((data: any) => {
            this.verse = data.verse;
            this.chapter = data.chapter;
            this.verseNumber = data.verseNumber;
            this.lastVerseNumber = data.lastVerseNumber;
          });
      }
    });
  }

  resetGameStats() {
    this.currentStreak = 0;
    this.correctAnswers = 0;
    this.totalQuestions = 0;
    this.longestStreak = 0;
  }

  resetUI() {
    this.attemptOne = AttemptStatuses.Unused;
    this.attemptTwo = AttemptStatuses.Unused;
    this.attemptThree = AttemptStatuses.Unused;
    this.currentAttempt = 1;
    this.noMoreAttempts = false;
    this.showCorrectChapterAlert = false;
    this.showCorrectChapterButton = true;
    this.showHelpButton = false;
    this.incorrectGuesses = [];
  }

  getRandomVerse() {
    this.bibleService.getRandomVerse(this.book, this.maxChapter)
      .then((data: any) => {
        console.log(data);
          this.verse = data.verse;
          this.chapter = data.chapter;
          this.verseNumber = data.verseNumber;
          this.lastVerseNumber = data.lastVerseNumber;
          this.resetUI();
      });
  }

  getNextVerse() {
    const nextVerse = this.bibleService.getNextVerse(this.book, this.chapter, this.verseNumber);
    this.verse += ` ${nextVerse}`;
    this.verseNumber++;
    this.showHelpButton = false;
  }

  nonAttemptsCorrect() {
    return !(this.attemptOne === AttemptStatuses.Correct
      || this.attemptTwo === AttemptStatuses.Correct
      || this.attemptThree === AttemptStatuses.Correct);
  }

  submit() {
    if (this.attemptInput === '') {
      return;
    }
    if (this.attemptInput === String(this.chapter)) {
      if (this.currentAttempt === 1) {
        this.attemptOne = AttemptStatuses.Correct;
      } else if (this.currentAttempt === 2) {
        this.attemptTwo = AttemptStatuses.Correct;
      } else {
        this.attemptThree = AttemptStatuses.Correct;
      }
      this.correctAnswers++;
      this.currentStreak++;
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak;
      }
    } else {
      if (this.currentAttempt === 1) {
        this.attemptOne = AttemptStatuses.Incorrect;
      } else if (this.currentAttempt === 2) {
        this.attemptTwo = AttemptStatuses.Incorrect;
      } else {
        this.attemptThree = AttemptStatuses.Incorrect;
      }
      this.incorrectGuesses.push(this.attemptInput);
      this.currentStreak = 0;
      this.showHelpButton = true;
    }
    this.attemptInput = '';
    this.currentAttempt++;
    this.attemptElement.nativeElement.focus();
    if (this.attemptThree === AttemptStatuses.Incorrect) {
      this.noMoreAttempts = true;
    }
    this.totalQuestions++;
  }

  showCorrectChapter() {
    this.showCorrectChapterAlert = true;
    this.showCorrectChapterButton = false;
  }
}

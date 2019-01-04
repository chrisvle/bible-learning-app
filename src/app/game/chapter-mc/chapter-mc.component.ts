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
  maxChapter: number = null;
  currentStreak = 0;
  longestStreak = 0;
  correctAnswers = 0;
  totalQuestions = 0;
  correct: boolean = false;
  attempt: boolean = false;

  attemptInput = 0;
  showCorrectChapterAlert = false;
  showCorrectChapterButton = true;

  verseMetadata$: Observable<any>;
  verse: string;
  chapter: number;
  options: number[];

  constructor(private ar: ActivatedRoute, private router: Router, private bibleService: BibleService) {
  }

  ngOnInit() {
    this.ar.queryParams.subscribe(params => {
      if (params["book"]) {
        if (params["maxChapter"]) {
          this.maxChapter = params["maxChapter"];
        }
        this.book = params["book"];
        this.bibleService.getRandomVerse(this.book, true, this.maxChapter)
          .then((data: any) => {
            console.log(data);
            this.verse = data.verse;
            this.chapter = data.chapter;
            this.options = data.options;
          });
      }
      else {
        this.router.navigateByUrl('/dashboard');
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
    this.showCorrectChapterAlert = false;
    this.showCorrectChapterButton = true;
    this.correct = false;
    this.attempt = false;
    this.attemptInput = 0;
  }

  getRandomVerse() {
    this.bibleService.getRandomVerse(this.book, true, this.maxChapter)
      .then((data: any) => {
        console.log(data);
          this.verse = data.verse;
          this.chapter = data.chapter;
          this.options = data.options;
          this.resetUI();
      });
  }

  submit() {
    this.attempt = true;
    if (this.attemptInput === 0) {
      this.attemptInput = this.options[0];
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

  selectChoice(choice: number) {
    this.attemptInput = choice;
  }
}

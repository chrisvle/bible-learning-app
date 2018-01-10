import { Injectable } from '@angular/core';
import { Testaments } from '../enums/testaments.enum';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BibleBook } from '../models/bible-book.model';
import { Utility } from '../utility';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class BibleService {

  private bibleBooks$: FirebaseListObservable<BibleBook[]>;
  private localEsv = {};

  constructor(private db: AngularFireDatabase, private util: Utility) {
    this.bibleBooks$ = this.db.list('bible-books');
  }

  /*
   * Options Object: {}
   * filter out one-chapter books - filterOutOneChapterBooks: true
   */
  getOldTestamentBooks(options?): Observable<BibleBook[]> {
    return this.bibleBooks$.map(books => {
      if (options.filterOutOneChapterBooks) {
        return books.filter(book => book.testament === Testaments.Old
          && book.chapters !== 1);
      } else {
        return books.filter(book => book.testament === Testaments.Old);
      }
    });
  }

  getNewTestamentBooks(options?): Observable<BibleBook[]> {
    return this.bibleBooks$.map(books => {
      if (options.filterOutOneChapterBooks) {
        return books.filter(book => book.testament === Testaments.New
          && book.chapters !== 1);
      } else {
        return books.filter(book => book.testament === Testaments.New);
      }
    });
  }

  getRandomVerse(bibleBook: string): Observable<{verse: string, chapter: string}> {
    let book$, chapter, randomVerseNumber: number;
    if (this.localEsv[bibleBook]) {
      console.log(`using local copy of ${bibleBook}`);
      book$ = this.localEsv[bibleBook];
      chapter = book$[this.util.rng(book$.length)];
      randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
      while (chapter[randomVerseNumber] == null) {
        randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
      }
      return Observable.of({
        verse: chapter[randomVerseNumber],
        chapter: chapter.$key
      });
    } else {
      console.log(`requesting ${bibleBook} from firebase`);
      book$ = this.db.list(`esv/${bibleBook}`);
      book$.subscribe(book => {
        this.localEsv[bibleBook] = book;
      });
      return book$.map(chapters => {
        chapter = chapters[this.util.rng(chapters.length)];
        randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
        while (chapter[randomVerseNumber] == null) {
          randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
        }
        return {
          verse: chapter[randomVerseNumber],
          chapter: chapter.$key
        };
      });
    }
  }
}

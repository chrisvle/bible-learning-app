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
    const options = [];
    if (this.localEsv[bibleBook]) {
      book$ = this.localEsv[bibleBook];
      chapter = book$[this.util.rng(book$.length)];
      randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
      while (chapter[randomVerseNumber] == null) {
        randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
      }
      options.push(+chapter.$key);
      while (options.length < 4) {
        const choice = this.util.rng(book$.length);
        if (!options.includes(choice) && choice !== 0) {
          options.push(choice);
        }
      }
      return Observable.of({
        verse: chapter[randomVerseNumber],
        chapter: chapter.$key,
        verseNumber: randomVerseNumber,
        lastVerseNumber: chapter.length - 1,
        options: this.util.shuffleInPlace(options)
      });
    } else {
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
        options.push(+chapter.$key);
        while (options.length < 4) {
          const choice = this.util.rng(chapters.length);
          if (!options.includes(choice) && choice !== 0) {
            options.push(choice);
          }
        }
        return {
          verse: chapter[randomVerseNumber],
          chapter: chapter.$key,
          verseNumber: randomVerseNumber,
          lastVerseNumber: chapter.length - 1,
          options: this.util.shuffleInPlace(options)
        };
      });
    }
  }

  getNextVerse(bibleBook: string, chapter: number, verseNumber: number) {
    let nextVerseNumber = verseNumber + 1;
    let nextVerse = this.localEsv[bibleBook][chapter - 1][nextVerseNumber];
    while (nextVerse === undefined) {
      nextVerseNumber++;
      nextVerse = this.localEsv[bibleBook][chapter - 1][nextVerseNumber];
    }
    return nextVerse;
  }
}

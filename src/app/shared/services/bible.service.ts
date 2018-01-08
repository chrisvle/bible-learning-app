import { Injectable } from '@angular/core';
import { Testaments } from '../enums/testaments.enum';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BibleBook } from '../models/bible-book.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class BibleService {

  private bibleBooks$: FirebaseListObservable<BibleBook[]>;
  private randomVerse$: any;

  constructor(private db: AngularFireDatabase) {
    this.bibleBooks$ = this.db.list('bible-books');
  }

  getOldTestamentBooks() {
    return this.bibleBooks$.map(books =>
      books.filter(book => book.testament === Testaments.Old)
    );
  }

  getNewTestamentBooks() {
    return this.bibleBooks$.map(books =>
      books.filter(book => book.testament === Testaments.New)
    );
  }

  getNumberOfChapters(bibleBook: string): Observable<number> {
    return this.bibleBooks$.map(books =>
      books.filter(book => book.name === bibleBook)[0].chapters
    );
  }

  getRandomVerse(bibleBook: string) {
    const book$ = this.db.list(`esv/${bibleBook}`);
    return book$.map(chapters => {
      const randomChapter = Math.floor(Math.random() * chapters.length);
      const chapter = chapters[randomChapter];
      let randomVerseNumber = Math.floor(Math.random() * (chapter.length - 1)) + 1;
      if (chapters[randomChapter][randomVerseNumber] == null) {
        randomVerseNumber = Math.floor(Math.random() * (chapter.length - 1)) + 1;
      }
      return {
        verse: chapters[randomChapter][randomVerseNumber],
        chapter: chapters[randomChapter].$key
      };
    });
  }
}

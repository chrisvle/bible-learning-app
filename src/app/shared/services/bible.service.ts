import { Injectable } from '@angular/core';
import { Testaments } from '../enums/testaments.enum';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BibleBook } from '../models/bible-book.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class BibleService {

  private bibleBooks$: FirebaseListObservable<BibleBook[]>;
  // private esv$: FirebaseListObservable<any[]>;
  private bibleBook$: FirebaseListObservable<any[]>;

  private numberOfChapters$: Observable<number>;
  private numberOfChapters: number;

  private randomVerse$: any;

  constructor(private db: AngularFireDatabase) {
    this.bibleBooks$ = this.db.list('bible-books');
    // this.esv$ = this.db.list('esv');
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
    // this works!!
    // return this.esv$.map(bible => bible.filter(esv => esv.$key === 'Matthew')[0][9][1]);
    this.bibleBook$ = this.db.list(`esv/${bibleBook}`);
    return this.bibleBook$;

    // this.randomVerse$ = this.db.object(`esv/${bibleBook}/9/1`);
    // return this.randomVerse$;
  }
}

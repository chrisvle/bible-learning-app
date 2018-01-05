import { Injectable } from '@angular/core';
import { Testament } from '../enums/testament.enum';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BibleBook } from '../models/bible-book.model';

@Injectable()
export class BibleService {

  private bibleBooks$: FirebaseListObservable<BibleBook[]>;

  constructor(private db: AngularFireDatabase) {
    this.bibleBooks$ = this.db.list('bible-books');
  }

  getOldTestamentBooks() {
    return this.bibleBooks$.map(books =>
      books.filter(book => book.testament === Testament.Old)
    );
  }

  getNewTestamentBooks() {
    return this.bibleBooks$.map(books =>
      books.filter(book => book.testament === Testament.New)
    );
  }
}

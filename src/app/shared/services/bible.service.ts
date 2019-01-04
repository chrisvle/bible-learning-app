import { Injectable } from '@angular/core';
import { Testaments } from '../enums/testaments.enum';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BibleBook } from '../models/bible-book.model';
import { Utility } from '../utility';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable()
export class BibleService {

  private bibleBooks$;
  private ot: Array<BibleBook>;
  private nt: Array<BibleBook>;
  private localEsv = {};

  constructor(private db: AngularFireDatabase, private util: Utility) {
    this.bibleBooks$ = this.db.list('bible-books');
    this.ot = null;
    this.nt = null;
  }

  getBibleBooks() {
    return this.bibleBooks$;
  }

  getOT() {
    return new Promise<Array<BibleBook>>(resolve => {
      if (this.ot) {
        resolve(this.ot);
      } else {
        this.bibleBooks$.valueChanges()
          .subscribe(books => {
            this.ot = books.filter((b: BibleBook) => b.testament==Testaments.Old && b.chapters > 1);
            resolve(this.ot);
          });
      }
    });
  }

  getNT() {
    return new Promise<Array<BibleBook>>(resolve => {
      if (this.nt) {
        resolve(this.nt);
      } else {
        this.bibleBooks$.valueChanges()
          .subscribe(books => {
            this.nt = books.filter((b: BibleBook) => b.testament==Testaments.New && b.chapters > 1);
            resolve(this.nt);
          });
      }
    });
  }

  getRandomVerse(bibleBook: string, maxChapter?: number) {
    let book$, chapter, randomVerseNumber: number;
    const options = [];

    // book is cached
    return new Promise(resolve => {
      if (this.localEsv[bibleBook]) {
        book$ = this.localEsv[bibleBook];
        const max = maxChapter ? maxChapter : book$.length;
        const randomChapterNumber = this.util.rng(max);
        chapter = book$[randomChapterNumber];
        randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
        while (chapter[randomVerseNumber] == null) {
          randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
        }
        options.push(randomChapterNumber);
        while (options.length < 4) {
          const choice = this.util.rng(book$.length);
          if (!options.includes(choice) && choice !== 0) {
            options.push(choice);
          }
        }
        const data = {
          verse: chapter[randomVerseNumber],
          chapter: randomChapterNumber + 1,
          verseNumber: randomVerseNumber,
          lastVerseNumber: chapter.length - 1,
          options: this.util.shuffleInPlace(options)
        };
        resolve(data);
      } else {
        const query = "esv/" + bibleBook;
        this.db.list(query).valueChanges()
          .subscribe((b: any) => {
            this.localEsv[bibleBook] = b;
            const max = maxChapter ? maxChapter : b.length;
            const randomChapterNumber = this.util.rng(max);
            chapter = b[randomChapterNumber];
            randomVerseNumber = this.util.rng(chapter.length - 1) + 1;
            const data = {
              verse: chapter[randomVerseNumber],
              chapter: randomChapterNumber + 1,
              verseNumber: randomVerseNumber,
              lastVerseNumber: chapter.length - 1
            };
            resolve(data);
        });
      }
    });
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

import { Injectable } from '@angular/core';
import { Testament } from './enums/testament.enum';

@Injectable()
export class BibleService {

  bibleBooks = [
    {
        'name': 'Acts',
        'testament': 1
    },
    {
        'name': 'Amos',
        'testament': 0
    },
    {
        'name': '1 Chronicles',
        'testament': 0
    },
    {
        'name': '2 Chronicles',
        'testament': 0
    },
    {
        'name': 'Colossians',
        'testament': 1
    },
    {
        'name': '1 Corinthians',
        'testament': 1
    },
    {
        'name': '2 Corinthians',
        'testament': 1
    },
    {
        'name': 'Daniel',
        'testament': 0
    },
    {
        'name': 'Deuteronomy',
        'testament': 0
    },
    {
        'name': 'Ecclesiastes',
        'testament': 0
    },
    {
        'name': 'Ephesians',
        'testament': 1
    },
    {
        'name': 'Esther',
        'testament': 0
    },
    {
        'name': 'Exodus',
        'testament': 0
    },
    {
        'name': 'Ezekiel',
        'testament': 0
    },
    {
        'name': 'Ezra',
        'testament': 0
    },
    {
        'name': 'Galatians',
        'testament': 1
    },
    {
        'name': 'Genesis',
        'testament': 0
    },
    {
        'name': 'Habakkuk',
        'testament': 0
    },
    {
        'name': 'Haggai',
        'testament': 0
    },
    {
        'name': 'Hebrews',
        'testament': 1
    },
    {
        'name': 'Hosea',
        'testament': 0
    },
    {
        'name': 'Isaiah',
        'testament': 0
    },
    {
        'name': 'James',
        'testament': 1
    },
    {
        'name': 'Jeremiah',
        'testament': 0
    },
    {
        'name': 'Job',
        'testament': 0
    },
    {
        'name': 'Joel',
        'testament': 0
    },
    {
        'name': 'John',
        'testament': 1
    },
    {
        'name': '1 John',
        'testament': 1
    },
    {
        'name': '2 John',
        'testament': 1
    },
    {
        'name': '3 John',
        'testament': 1
    },
    {
        'name': 'Jonah',
        'testament': 0
    },
    {
        'name': 'Joshua',
        'testament': 0
    },
    {
        'name': 'Jude',
        'testament': 1
    },
    {
        'name': 'Judges',
        'testament': 0
    },
    {
        'name': '1 Kings',
        'testament': 0
    },
    {
        'name': '2 Kings',
        'testament': 0
    },
    {
        'name': 'Lamentations',
        'testament': 0
    },
    {
        'name': 'Leviticus',
        'testament': 0
    },
    {
        'name': 'Luke',
        'testament': 1
    },
    {
        'name': 'Malachi',
        'testament': 0
    },
    {
        'name': 'Mark',
        'testament': 1
    },
    {
        'name': 'Matthew',
        'testament': 1
    },
    {
        'name': 'Micah',
        'testament': 0
    },
    {
        'name': 'Nahum',
        'testament': 0
    },
    {
        'name': 'Nehemiah',
        'testament': 0
    },
    {
        'name': 'Numbers',
        'testament': 0
    },
    {
        'name': 'Obadiah',
        'testament': 0
    },
    {
        'name': '1 Peter',
        'testament': 1
    },
    {
        'name': '2 Peter',
        'testament': 1
    },
    {
        'name': 'Philemon',
        'testament': 1
    },
    {
        'name': 'Philippians',
        'testament': 1
    },
    {
        'name': 'Proverbs',
        'testament': 0
    },
    {
        'name': 'Psalms',
        'testament': 0
    },
    {
        'name': 'Revelation',
        'testament': 1
    },
    {
        'name': 'Romans',
        'testament': 1
    },
    {
        'name': 'Ruth',
        'testament': 0
    },
    {
        'name': '1 Samuel',
        'testament': 0
    },
    {
        'name': '2 Samuel',
        'testament': 0
    },
    {
        'name': 'Song of Solomon',
        'testament': 0
    },
    {
        'name': '1 Thessalonians',
        'testament': 1
    },
    {
        'name': '2 Thessalonians',
        'testament': 1
    },
    {
        'name': '1 Timothy',
        'testament': 1
    },
    {
        'name': '2 Timothy',
        'testament': 1
    },
    {
        'name': 'Titus',
        'testament': 1
    },
    {
        'name': 'Zechariah',
        'testament': 0
    },
    {
        'name': 'Zephaniah',
        'testament': 0
    }
  ];

  constructor() { }

  getBibleBooks() {
    return this.bibleBooks;
  }

  getOldTestamentBooks() {
      return this.bibleBooks.filter(book => book.testament === Testament.Old);
  }

  getNewTestamentBooks() {
      return this.bibleBooks.filter(book => book.testament === Testament.New);
  }

}

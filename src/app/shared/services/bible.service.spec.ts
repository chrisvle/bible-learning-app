import { ReflectiveInjector } from '@angular/core';
import { BibleService } from './bible.service';

xdescribe('BibleService', () => {
  let bibleService: BibleService;

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      BibleService
    ]);

    bibleService = this.injector.get(BibleService);
  });

  it('should be created', () => {
    expect(bibleService).toBeTruthy();
  });

  it('should return right number of books in bible', () => {
    const bibleBooks = bibleService.getAllBibleBooks();
    expect(bibleBooks.length).toBe(66);
  });

  it('should return right number of old testament books', () => {
    const otBooks = bibleService.getOldTestamentBooks();
    expect(otBooks.length).toBe(39);
  });

  it('should return right number of new testament books', () => {
    const ntBooks = bibleService.getNewTestamentBooks();
    expect(ntBooks.length).toBe(27);
  });
});

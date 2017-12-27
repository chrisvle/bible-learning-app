import { by, element, ElementFinder } from 'protractor';

export class DashboardPage {
  path: string;
  noGameTypeText: ElementFinder;
  noOldOrNewText: ElementFinder;
  noBibleBookText: ElementFinder;
  gameTypeSelection: ElementFinder;
  oldOrNewSelection: ElementFinder;
  bibleBookSelection: ElementFinder;
  chapterOnlySelectButton: ElementFinder;
  oldTestamentSelectButton: ElementFinder;
  genesisSelectButton: ElementFinder;
  playNowButton: ElementFinder;

  constructor() {
    this.path = 'dashboard';
    this.noGameTypeText = element(by.id('noGameTypeText'));
    this.noOldOrNewText = element(by.id('noOldOrNewText'));
    this.noBibleBookText = element(by.id('noBibleBookText'));
    this.gameTypeSelection = element(by.id('selectedGameType'));
    this.oldOrNewSelection = element(by.id('selectedOldOrNew'));
    this.bibleBookSelection = element(by.id('selectedBibleBook'));
    this.chapterOnlySelectButton = element(by.id('ChapterOnlySelectButton'));
    this.oldTestamentSelectButton = element(by.id('oldTestamentSelectButton'));
    this.genesisSelectButton = element(by.id('GenesisSelectButton'));
    this.playNowButton = element(by.id('playNowButton'));
  }
}

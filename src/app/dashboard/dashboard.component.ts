import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  gameType: string;
  oldOrNew: string;
  bibleBook: string;

  gameTypes = [
    {
      id: 0,
      type: 'Guess the Chapter',
      description: 'Pick a book. Get a random verse. Guess the chapter.'
    },
    {
      id: 1,
      type: 'Guess the Chapter and the Verse',
      description: 'Pick a book. Get a random verse. Guess the chapter and the verse.'
    }
  ];

  constructor() { }

}

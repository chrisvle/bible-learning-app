import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {
  gameTypes = [
    {
      id: 0,
      type: 'Chapter Only',
      description: 'Get a random verse. Guess the chapter.'
    },
    {
      id: 1,
      type: 'Chapter and Verse',
      description: 'Get a random verse. Guess the chapter and the verse.'
    },
    {
      id: 2,
      type: 'Fill in the Blank',
      description: 'Get a random verse. Fill in the Blank.'
    },
    {
      id: 3,
      type: 'Matching',
      description: 'Get some random verses. Match the verse with the right chapter.'
    }
  ];

  constructor() { }

  getGameTypes() {
    return this.gameTypes;
  }
}

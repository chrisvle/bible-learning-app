import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GameType } from '../shared/models/game-type.model';

@Injectable()
export class DashboardService {
  private gameTypes$: FirebaseListObservable<GameType[]>;

  constructor(private db: AngularFireDatabase) {
    this.gameTypes$ = this.db.list('game-types');
  }

  getGameTypes() {
    return this.gameTypes$;
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { GameType } from '../shared/models/game-type.model';

@Injectable()
export class DashboardService {
  private gameTypes$: AngularFireList<GameType[]>;

  constructor(private db: AngularFireDatabase) {
    this.gameTypes$ = this.db.list('game-types');
  }

  getGameTypes() {
    return this.gameTypes$;
  }
}

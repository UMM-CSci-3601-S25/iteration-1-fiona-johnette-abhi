import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameCodeSubject = new BehaviorSubject<string>('');
  private playersJoinedSubject = new BehaviorSubject<number>(0);
  private gameFullSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  generateGameCode(): string {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.gameCodeSubject.next(code);
    return code;
  }

  getGameCode() {
    return this.gameCodeSubject.asObservable();
  }

  updatePlayersJoined(count: number) {
    this.playersJoinedSubject.next(count);
    if (count >= 12) {
      this.gameFullSubject.next(true);
    } else {
      this.gameFullSubject.next(false);
    }
  }

  getPlayersJoined() {
    return this.playersJoinedSubject.asObservable();
  }

  isGameFull() {
    return this.gameFullSubject.asObservable();
  }

  startGame() {
    // logic for starting the game
  }
}

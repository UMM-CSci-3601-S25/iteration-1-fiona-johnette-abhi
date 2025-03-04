// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class GameService {
//   private gameCodeSubject = new BehaviorSubject<string>('');
//   private playersJoinedSubject = new BehaviorSubject<number>(0);
//   private gameFullSubject = new BehaviorSubject<boolean>(false);

//   constructor() { }

//   generateGameCode(): string {
//     const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     this.gameCodeSubject.next(code);
//     return code;
//   }

//   getGameCode() {
//     return this.gameCodeSubject.asObservable();
//   }

//   updatePlayersJoined(count: number) {
//     this.playersJoinedSubject.next(count);
//     if (count >= 12) {
//       this.gameFullSubject.next(true);
//     } else {
//       this.gameFullSubject.next(false);
//     }
//   }

//   getPlayersJoined() {
//     return this.playersJoinedSubject.asObservable();
//   }

//   isGameFull() {
//     return this.gameFullSubject.asObservable();
//   }

//   startGame() {
//     // logic for starting the game
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameCodeSubject = new BehaviorSubject<string>('');
  private playersJoinedSubject = new BehaviorSubject<number>(0);
  private gameFullSubject = new BehaviorSubject<boolean>(false);
  private judgeSubject = new BehaviorSubject<boolean>(false);
  private questions: string[] = [];

  constructor(private http: HttpClient) { }

  generateGameCode(): string {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.gameCodeSubject.next(code);
    return code;
  }

  getGameCode(): Observable<string> {
    return this.gameCodeSubject.asObservable();
  }

  updatePlayersJoined(count: number): void {
    this.playersJoinedSubject.next(count);
    if (count >= 12) {
      this.gameFullSubject.next(true);
    } else {
      this.gameFullSubject.next(false);
    }
  }

  getPlayersJoined(): Observable<number> {
    return this.playersJoinedSubject.asObservable();
  }

  isGameFull(): Observable<boolean> {
    return this.gameFullSubject.asObservable();
  }

  getJudgeStatus(): Observable<boolean> {
    return this.judgeSubject.asObservable();
  }

  setJudgeStatus(isJudge: boolean): void {
    this.judgeSubject.next(isJudge);
  }

  loadQuestions(): void {
    this.http.get<{ prompts: string[] }>('/assets/qprompts.json').subscribe(data => {
      this.questions = data.prompts;
    });
  }

  getRandomQuestion(): string {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return this.questions[randomIndex];
  }

  startGame(): void {
    // logic for starting the game
  }
}

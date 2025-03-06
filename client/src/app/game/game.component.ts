import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  roundTitle: string = 'Round 1';
  isJudge: boolean = false; // Set this value based on your game logic
  prompt: string = 'Write your best answer!';
  playerAnswer: string = '';
  isJudgingPhase: boolean = false; // Set this value based on your game logic
  playersJoined: number = 0;
  points: number = 0;

  onPlayerAnswerChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.playerAnswer = inputElement.value;
  }

  submitAnswer() {
    // Logic for submitting the answer
    console.log('Answer submitted:', this.playerAnswer);
  }

  pickWinner(answer: string) {
    // Logic for picking the winner
    console.log('Winner picked:', answer);
  }
}

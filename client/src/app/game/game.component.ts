import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  roundTitle = 'Round 1';
  playersJoined = 0;
  points = 0;
  prompt = '';
  answers: string[] = [];
  isJudge = false;
  isJudgingPhase = false;
  maxPoints = 60;

  ngOnInit() {
    this.assignRoles();
    this.updateStatus();
  }

  assignRoles() {
    // Logic to randomly assign a judge for the round
    this.isJudge = Math.random() < 0.1; // Example logic
    document.getElementById('role').textContent = this.isJudge ? 'Judge' : 'Player';
    this.toggleVisibility('judge-section', this.isJudge);
    this.toggleVisibility('player-section', !this.isJudge);
  }

  toggleVisibility(elementId: string, isVisible: boolean) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.display = isVisible ? 'block' : 'none';
    }
  }

  submitPrompt() {
    this.prompt = (document.getElementById('prompt') as HTMLTextAreaElement).value;
    document.getElementById('display-prompt').textContent = this.prompt;
    this.isJudgingPhase = true;
    this.toggleVisibility('judge-section', false);
    this.toggleVisibility('judging-phase', true);
  }

  submitAnswer() {
    const answer = (document.getElementById('player-answer') as HTMLTextAreaElement).value;
    if (answer) {
      this.answers.push(answer);
      (document.getElementById('player-answer') as HTMLTextAreaElement).value = '';
    }
  }

  pickBestAnswer(index: number) {
    console.log('Selected answer index:', index); // Example use case
    this.points += 20;
    if (this.points >= this.maxPoints) {
      alert('Game over! You have won.');
    } else {
      this.nextRound();
    }
  }

  nextRound() {
    this.roundTitle = `Round ${parseInt(this.roundTitle.split(' ')[1], 10) + 1}`;
    this.answers = [];
    this.isJudgingPhase = false;
    document.getElementById('round-title').textContent = this.roundTitle;
    this.assignRoles();
    this.toggleVisibility('judging-phase', false);
    document.getElementById('answers-list').innerHTML = '';
    this.updateStatus();
  }

  updateStatus() {
    document.getElementById('players-joined').textContent = this.playersJoined.toString();
    document.getElementById('points').textContent = this.points.toString();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-host',
  templateUrl: './hostgame.component.html',
  styleUrls: ['./hostgame.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ]
})
export class HostgameComponent implements OnInit {
  gameCode: string = '';            // Store the generated game code
  playersJoined: number = 0;        // Track the number of players that have joined
  totalPlayers: number = 12;        // Max number of players
  minPlayers: number = 5;           // Minimum players required to start the game

  constructor(private router: Router) {}

  // Generate a random game code
  generateGameCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) { // Generate a 6-character code
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  // Function to simulate player joining
  simulatePlayerJoining() {
    if (this.playersJoined < this.totalPlayers) {
      this.playersJoined++;
    }
  }

  // Function to start the game when enough players join
  startGame() {
    if (this.playersJoined >= this.minPlayers) {
      alert('Game started with code: ' + this.gameCode);
      // Add your logic to navigate to the game or start it
    } else {
      alert('Not enough players to start the game.');
    }
  }

  // Initialize the game code when the component is loaded
  ngOnInit() {
    this.gameCode = this.generateGameCode();  // Generate random code for the host
  }
}


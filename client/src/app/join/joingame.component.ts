import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-joingame',
  templateUrl: './joingame.component.html',
  styleUrls: ['./joingame.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ]
})
export class JoingameComponent implements OnInit {
  gameCode: string = '';
  playersJoined: number = 0;
  gameFull: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    // Get the generated game code from the GameService
    this.gameService.getGameCode().subscribe(code => {
      this.gameCode = code;
    });
    // Subscribe to the number of players joined
    this.gameService.getPlayersJoined().subscribe(count => {
      this.playersJoined = count;
    });

    // Subscribe to the game full status
    this.gameService.isGameFull().subscribe(full => {
      this.gameFull = full;
    });
  }

  joinGame(enteredCode: string) {
    // Check if the entered code matches the generated game code and ensure the game is not full
    if (enteredCode.trim() !== '' && enteredCode === this.gameCode && this.playersJoined < 12) {
      this.playersJoined++;
      this.gameService.updatePlayersJoined(this.playersJoined);
      // Check if the game is now full
      if (this.playersJoined >= 12) {
        this.gameFull = true;
      }

      // Navigate to StartgameComponent
      this.router.navigate(['/startgame']);
    } else {
      alert('Invalid Game Code or Game Full');
    }
  }

  backToHome() {
    // Navigate back to the home page
    this.router.navigate(['/home']);
  }
}

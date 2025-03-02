import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-joingame',
  templateUrl: './joingame.component.html',
  styleUrls: ['./joingame.component.scss']
})
export class JoingameComponent implements OnInit {
  gameCode: string = '';
  playersJoined: number = 0;
  gameFull: boolean = false;

  constructor(private gameService: GameService) { }

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
    } else {
      alert('Invalid Game Code or Game Full');
    }
  }

  backToHome() {
    // This method can be used to navigate back to the home page if necessary
    // You can use router.navigate(['/home']) if the Router is needed for this method
    console.log('Navigating back to home');
  }
}

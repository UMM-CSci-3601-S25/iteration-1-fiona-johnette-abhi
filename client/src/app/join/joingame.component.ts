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
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ]
})
export class JoingameComponent implements OnInit {
  enteredGameCode: string = '';
  correctGameCode: string = '';
  playersJoined: number = 0;
  gameFull: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    // Get the generated game code from the GameService
    this.gameService.getGameCode().subscribe(code => {
      this.correctGameCode = code;
      console.log('Correct game code from host:', this.correctGameCode);
    });
    // Subscribe to the number of players joined
    this.gameService.getPlayersJoined().subscribe(count => {
      this.playersJoined = count;
    });
  }

  joinGame(enteredCode: string) {
    console.log('Entered game code:', enteredCode);
    if (enteredCode === this.correctGameCode) {
      // Proceed to join the game
      console.log('Joining game...');
      // Navigate to the game page or any other logic you want to include
      this.router.navigate(['/game']);
    } else {
      // Log an error message
      console.log('Entered game code does not match the correct game code');
    }
  }
}


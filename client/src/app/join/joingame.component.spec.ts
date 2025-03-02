import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JoingameComponent } from './joingame.component';
import { GameService } from '../services/game.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule


describe('JoingameComponent', () => {
  let component: JoingameComponent;
  let fixture: ComponentFixture<JoingameComponent>;
  let gameService: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    const gameServiceSpy = jasmine.createSpyObj('GameService', ['getGameCode', 'getPlayersJoined', 'isGameFull', 'updatePlayersJoined']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [JoingameComponent, RouterModule.forRoot([])],
      providers: [
        { provide: GameService, useValue: gameServiceSpy },
        { provide: Router, useValue: routerSpyObj }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore template errors in test (not needed for this case)
    }).compileComponents();

    gameService = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;

    gameService.getGameCode.and.returnValue(of('ABC123'));
    gameService.getPlayersJoined.and.returnValue(of(4));  // simulate 4 players joined
    gameService.isGameFull.and.returnValue(of(false));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoingameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the game code input field', () => {
    const inputElement = fixture.debugElement.query(By.css('#gameCode')).nativeElement;
    expect(inputElement).toBeTruthy();
  });

  it('should enable Join Game button when game code is entered and not full', () => {
    const inputElement = fixture.debugElement.query(By.css('#gameCode')).nativeElement;
    const joinButton = fixture.debugElement.query(By.css('button')).nativeElement;

    inputElement.value = 'ABC123';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(joinButton.disabled).toBeFalse();
  });

  it('should disable Join Game button when game code input is empty', () => {
    const inputElement = fixture.debugElement.query(By.css('#gameCode')).nativeElement;
    const joinButton = fixture.debugElement.query(By.css('button')).nativeElement;

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(joinButton.disabled).toBeTrue();
  });

  it('should show error message for invalid game code', () => {
    const inputElement = fixture.debugElement.query(By.css('#gameCode')).nativeElement;
    inputElement.value = 'INVALID';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    spyOn(window, 'alert');
    component.joinGame(inputElement.value);
    expect(window.alert).toHaveBeenCalledWith('Invalid Game Code or Game Full');
  });

  it('should join the game when valid code is entered', () => {
    const inputElement = fixture.debugElement.query(By.css('#gameCode')).nativeElement;
    inputElement.value = 'ABC123';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.joinGame(inputElement.value);
    expect(component.playersJoined).toBe(5);
  });

});

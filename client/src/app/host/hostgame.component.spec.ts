import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostgameComponent } from './hostgame.component';
import { RouterModule } from '@angular/router'; // Import RouterModule

describe('HostgameComponent', () => {
  let component: HostgameComponent;
  let fixture: ComponentFixture<HostgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostgameComponent, RouterModule.forRoot([])], // Import HostgameComponent
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a game code on init', () => {
    component.ngOnInit();
    expect(component.gameCode).toMatch(/^[A-Za-z0-9]{6}$/);
  });

  it('should start the game when there are at least 5 players', () => {
    component.playersJoined = 5;
    spyOn(window, 'alert');
    component.startGame();
    expect(window.alert).toHaveBeenCalledWith(`Game started with code: ${component.gameCode}`);
  });

  it('should not start the game when there are less than 5 players', () => {
    component.playersJoined = 4;
    spyOn(window, 'alert');
    component.startGame();
    expect(window.alert).toHaveBeenCalledWith('Not enough players to start the game.');
  });

  it('should simulate player joining', () => {
    component.playersJoined = 0;
    component.simulatePlayerJoining();
    expect(component.playersJoined).toBe(1);
  });

  it('should not exceed the total number of players', () => {
    component.playersJoined = component.totalPlayers;
    component.simulatePlayerJoining();
    expect(component.playersJoined).toBe(component.totalPlayers);
  });
});

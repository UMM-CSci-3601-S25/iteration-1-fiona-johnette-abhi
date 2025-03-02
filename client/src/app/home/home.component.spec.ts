import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('Home', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, HomeComponent],
    });

    fixture = TestBed.createComponent(HomeComponent);

    component = fixture.componentInstance; // BannerComponent test instance

    // query for the link (<a> tag) by CSS element selector
    de = fixture.debugElement.query(By.css('.home-card'));

  });


  it('should have the heading CARDS AGAINST APPLES', () => {
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement as HTMLElement;
    expect(el.textContent).toContain('CARDS AGAINST APPLES');
    expect(component).toBeTruthy();
  });

  // it('should have a Host Game button', () => {
  //   fixture.detectChanges();
  //   de = fixture.debugElement.query(By.css('a[href="hostgame.component.html"] button'));
  //   expect(de).not.toBeNull();
  //   el = de.nativeElement as HTMLElement;
  //   expect(el.textContent).toContain('Host Game');
  // });

  // it('should have a Join Game button', () => {
  //   fixture.detectChanges();
  //   de = fixture.debugElement.query(By.css('a[href="joingame.component.html"] button'));
  //   expect(de).not.toBeNull();
  //   el = de.nativeElement as HTMLElement;
  //   expect(el.textContent).toContain('Join Game');
  // });
});

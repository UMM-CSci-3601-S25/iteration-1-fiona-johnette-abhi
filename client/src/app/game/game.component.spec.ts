// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { GameComponent } from './game.component';
// import { environment } from '../../environments/environment';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// describe('GameComponent', () => {
//   let component: GameComponent;
//   let fixture: ComponentFixture<GameComponent>;
//   let httpMock: HttpTestingController;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       declarations: [GameComponent],
//       imports: [
//         HttpClientTestingModule,
//         ReactiveFormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatButtonModule
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(GameComponent);
//     component = fixture.componentInstance;
//     httpMock = TestBed.inject(HttpTestingController);
//     fixture.detectChanges();
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });

//   // it('should load prompts on init', () => {
//   //   const req = httpMock.expectOne(`${environment.apiUrl}qprompt.json`);
//   //   expect(req.request.method).toBe('GET');
//   //   req.flush([
//   //     { _id: { $oid: '1' }, prompt: 'Test prompt 1' },
//   //     { _id: { $oid: '2' }, prompt: 'Test prompt 2' }
//   //   ]);
//   //   expect(component.prompts.length).toBe(2);
//   //   expect(component.selectedPrompt).toBeDefined();
//   // });

//   // it('should select a random prompt', () => {
//   //   component.prompts = [
//   //     { _id: { $oid: '1' }, prompt: 'Test prompt 1' },
//   //     { _id: { $oid: '2' }, prompt: 'Test prompt 2' }
//   //   ];
//   //   component.selectRandomPrompt();
//   //   expect(component.selectedPrompt).toMatch(/Test prompt [1-2]/);
//   // });

//   // it('should submit response', () => {
//   //   spyOn(console, 'log');
//   //   component.responseForm.controls['code'].setValue('1234');
//   //   component.responseForm.controls['response'].setValue('My response');
//   //   component.submitResponse();
//   //   expect(console.log).toHaveBeenCalledWith('Code: 1234, Response: My response');
//   // });
// });

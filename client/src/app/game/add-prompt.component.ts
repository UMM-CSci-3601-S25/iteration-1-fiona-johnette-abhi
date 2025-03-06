// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatOptionModule } from '@angular/material/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   selector: 'app-add-prompt',
//   templateUrl: './add-prompt.component.html',

//   imports: [
//     FormsModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatOptionModule,
//     MatButtonModule,
//     MatIconModule
//   ]
// })
// export class AddPromptComponent implements OnInit {
//   addPromptForm: FormGroup;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.addPromptForm = this.fb.group({
//       prompt: ['', Validators.required]
//     });
//   }

//   submitForm(): void {
//     if (this.addPromptForm.valid) {
//       const newPrompt = this.addPromptForm.value;
//       console.log('New Prompt:', newPrompt);
//       // Add your logic to save the prompt to your database
//     }
//   }

//   formControlHasError(controlName: string): boolean {
//     const control = this.addPromptForm.get(controlName);
//     return control?.invalid && (control.dirty || control.touched);
//   }

//   getErrorMessage(controlName: string): string {
//     const control = this.addPromptForm.get(controlName);
//     if (control?.hasError('required')) {
//       return 'This field is required';
//     }
//     // Add more error handling as needed
//     return '';
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
//import { MatHint } from '@angular/material/form-field';

interface Prompt {
  _id: { $oid: string };
  prompt: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers:[],
  imports: [
    MatFormField,
    MatLabel,
    //MatHint

  ]
})
export class GameComponent implements OnInit {
  prompts: Prompt[] = [];
  selectedPrompt: string;
  responseForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadPrompts();
    this.responseForm = this.fb.group({
      code: ['', Validators.required],
      response: ['', Validators.required]
    });
  }

  loadPrompts(): void {
    this.http.get<Prompt[]>(`${environment.apiUrl}qprompt.json`).subscribe(data => {
      this.prompts = data;
      this.selectRandomPrompt();
    });
  }

  selectRandomPrompt(): void {
    const randomIndex = Math.floor(Math.random() * this.prompts.length);
    this.selectedPrompt = this.prompts[randomIndex].prompt;
  }

  submitResponse(): void {
    if (this.responseForm.valid) {
      const code = this.responseForm.get('code').value;
      const response = this.responseForm.get('response').value;
      console.log(`Code: ${code}, Response: ${response}`);
      // Perform further actions like sending the response to the server
    }
  }
}

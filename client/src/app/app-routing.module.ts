import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './users/add-user.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { HostgameComponent } from './host/hostgame.component';
import { JoingameComponent } from './join/joingame.component';
import { GameComponent } from './game/game.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    HttpClientModule,
    HomeComponent,
    RouterLink,

  ]
})
export class AppModule { }

// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'hostgame', component: HostgameComponent },
  { path: 'joingame', component: JoingameComponent },
  { path: 'game', component: GameComponent },


  { path: 'users', component: UserListComponent, title: 'Users' },
  { path: 'users/new', component: AddUserComponent, title: 'Add User' },
  { path: 'users/:id', component: UserProfileComponent, title: 'User Profile' },
  { path: 'companies', component: CompanyListComponent, title: 'Companies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


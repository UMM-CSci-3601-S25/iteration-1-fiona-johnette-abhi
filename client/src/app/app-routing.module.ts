import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './users/add-user.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { HostgameComponent } from './host/hostgame.component';
import { JoingameComponent } from './join/joingame.component';
//import { FormsModule } from '@angular/forms';


// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'hostgame', component: HostgameComponent},
  {path: 'joingame', component: JoingameComponent},

  {path: 'users', component: UserListComponent, title: 'Users'},
  {path: 'users/new', component: AddUserComponent, title: 'Add User'},
  {path: 'users/:id', component: UserProfileComponent, title: 'User Profile'},
  {path: 'companies', component: CompanyListComponent, title: 'Companies'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


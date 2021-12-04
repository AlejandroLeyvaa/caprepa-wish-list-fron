import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { WishListComponent } from './wish-list/create-wish-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign', pathMatch: 'prefix' },
  { path: 'login', component: LoginComponent },
  { path: 'sign', component: SignComponent },
  { path: 'create-wish-list', component: WishListComponent },
  { path: 'users-wish-list', component: UsersComponent },
  { path: 'current-user', component: UserComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import {AvatarComponent} from './components/avatar/avatar.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'avatar',
    component: AvatarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

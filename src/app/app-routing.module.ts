import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserComponent } from './components/auth/user/user.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [ {
  path: 'home',
  component: HomeComponent,
  canActivate:[AuthGuard]
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'user', component: UserComponent,
  children: [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ]
},
{
  path:'**',
  component:PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

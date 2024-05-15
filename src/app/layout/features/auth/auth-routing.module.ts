import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Components/auth.component';
import { SigninComponent } from './Components/signin/signin.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthComponent,
    // canActivate:[IsAuthenticatedGuard],
    children: [
      { path: 'login', component:SigninComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

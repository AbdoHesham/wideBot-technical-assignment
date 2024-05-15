import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { authGuard } from '../core/guards/auth.guard';
import { permissionsGuard } from '../core/guards/permissions.guard';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },

      // {
      //   path: 'users',
      //   loadChildren: () =>
      //   import('./features/users/users.module').then(
      //     (m) => m.UsersModule
      //   ),
      //   pathMatch: 'full',
      //   canActivate: [authGuard],
      // },

      {
        path: 'home',
        component: HomeComponent,
      },
      
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

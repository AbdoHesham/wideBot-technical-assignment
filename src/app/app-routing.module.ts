import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },

  {
    path: 'layout',
    loadChildren: () =>
      import('./layout/layout.module').then(
        (m) => m.LayoutModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./layout/features/auth/auth.module').then((m) => m.AuthModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

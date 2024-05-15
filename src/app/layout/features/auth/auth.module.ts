import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './Components/auth.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { SigninComponent } from './Components/signin/signin.component';

import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    GalleriaModule,


  ]
})
export class AuthModule { }

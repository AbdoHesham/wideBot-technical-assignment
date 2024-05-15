import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateEditComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  exports:[
    ListComponent,
    CreateEditComponent,
    DetailsComponent
  ]
})
export class UsersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBodyUserComponent } from './users/dialog-body-user/dialog-body-user.component';
import {UserEditComponent} from "./users/user-edit/user-edit.comonent";
import {TransactionListComponent} from "./transactions/transaction-list/transaction-list.component";
import {TransactionCreateComponent} from "./transactions/transaction-create/transaction-create.component";
import {InterestListComponent} from "./interest/interest-list/interest-list.component";



@NgModule({
  declarations: [
    UserCreateComponent,
    UserListComponent,
    UserEditComponent,
    TransactionListComponent,
    TransactionCreateComponent,
    InterestListComponent,
    DialogBodyUserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import {UserEditComponent} from "./users/user-edit/user-edit.comonent";
import {TransactionListComponent} from "./transactions/transaction-list/transaction-list.component";
import {TransactionCreateComponent} from "./transactions/transaction-create/transaction-create.component";
import {InterestListComponent} from "./interest/interest-list/interest-list.component";

const routes: Routes = [
  { path:'users', component: UserListComponent },
  { path:'userCreate', component: UserCreateComponent},
  { path:'userEdit/:id', component: UserEditComponent},
  { path:'transactions', component: TransactionListComponent },
  { path:'transactionCreate', component: TransactionCreateComponent},
  { path:'interests', component: InterestListComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

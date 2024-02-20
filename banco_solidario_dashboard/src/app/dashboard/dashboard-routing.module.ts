import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import {UserEditComponent} from "./users/user-edit/user-edit.comonent";

const routes: Routes = [
  { path:'users', component: UserListComponent },
  { path:'userCreate', component: UserCreateComponent},
  { path:'userEdit/:id', component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

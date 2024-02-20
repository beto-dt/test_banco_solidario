import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { CheckLoginGuard } from './guards/check-login.guard';
import {SliderbarComponent} from "./sliderbar/sliderbar.component";

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  { path: 'login', component: AuthComponent,canActivate:[CheckLoginGuard]},
  { path: 'dashboard',component: SliderbarComponent,
    children : [
      {
        path: 'users',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

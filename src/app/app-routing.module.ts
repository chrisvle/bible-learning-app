import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { GameModule } from './game/game.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => LoginModule
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'game',
        loadChildren: () => GameModule
      },
      {
        path: 'dashboard',
        loadChildren: () => DashboardModule
      },
      {
        path: '',
        redirectTo: 'dashboard', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

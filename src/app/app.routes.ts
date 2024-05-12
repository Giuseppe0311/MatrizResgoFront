import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
        {
            path: '',
            component: DashboardComponent
        }
    ]
  }

];

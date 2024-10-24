import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsuariosComponent } from './paginas/dashboard/usuarios/usuarios.component';
import { MatricesComponent } from './paginas/dashboard/matrices/matrices.component';
import {LoginComponent} from "./paginas/login/login.component";
import {authGuard} from "./guard/auth.guard";
import {AssignUsersComponent} from "./paginas/dashboard/assign-users/assign-users.component";
import {EmpresasComponent} from "./paginas/dashboard/empresas/empresas.component";
import {EventsAssignedComponent} from "./paginas/dashboard/events-assigned/events-assigned.component";
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'matrices',
        component: MatricesComponent
      },
      {
        path: 'asignar-usuarios',
        component: AssignUsersComponent
      },
      {
        path: 'empresas',
        component: EmpresasComponent
      },{
      path: 'eventos-asignados',
        component: EventsAssignedComponent
      }
    ],
  },
  { path: '**', component: NotfoundComponent },
];


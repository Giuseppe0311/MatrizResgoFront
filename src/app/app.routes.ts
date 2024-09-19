import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsuariosComponent } from './paginas/dashboard/usuarios/usuarios.component';
import { MatricesComponent } from './paginas/dashboard/matrices/matrices.component';
import { UpdatematrizComponent } from './paginas/dashboard/matrices/updatematriz/updatematriz.component';
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'matrices',
        component: MatricesComponent,
      },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

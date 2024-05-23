import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { EmpresasComponent } from './paginas/dashboard/empresas/empresas.component';
import { SucursalesComponent } from './paginas/dashboard/sucursales/sucursales.component';
import { UsuariosComponent } from './paginas/dashboard/usuarios/usuarios.component';
import { TablaeventosComponent } from './paginas/dashboard/tablaeventos/tablaeventos.component';
import { PuteventosComponent } from './paginas/dashboard/puteventos/puteventos.component';

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
        },
        {
            path: 'empresas',
            component: EmpresasComponent
        },
        {
            path: 'sucursales',
            component: SucursalesComponent
        },
        {
            path: 'usuarios',
            component: UsuariosComponent
        },
        {
            path: 'eventos',
            component: TablaeventosComponent
        },
        {
          path: 'put-eventos',
          component: PuteventosComponent
      }
    ]
  },
  { path: '**', component: NotfoundComponent },
];

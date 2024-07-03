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
import { MatricesComponent } from './paginas/dashboard/matrices/matrices.component';
import { VereventosComponent } from './paginas/dashboard/vereventos/vereventos.component';
import { CompartirusuarioComponent } from './paginas/dashboard/tablaeventos/compartirusuario/compartirusuario.component';

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
        path: 'empresas',
        component: EmpresasComponent,
      },
      {
        path: 'sucursales',
        component: SucursalesComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'matrices',
        component: MatricesComponent,
      },
      {
        path: 'matrices/eventos',
        component: TablaeventosComponent,
      },
      {
        path: 'matrices/eventos/vermatriz',
        component: PuteventosComponent,
      },
      {
        path: 'matrices/eventos/vereventos',
        component: VereventosComponent
      },
      {
        path: 'matrices/eventos/compartirusuario',
        component: CompartirusuarioComponent
      }
    ],
  },
  { path: '**', component: NotfoundComponent },
];

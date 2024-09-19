import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './paginas/dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsuariosComponent } from './paginas/dashboard/usuarios/usuarios.component';
import { MatricesComponent } from './paginas/dashboard/matrices/matrices.component';
import { UpdatematrizComponent } from './paginas/dashboard/matrices/updatematriz/updatematriz.component';
import { GuardService } from './guard/guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full' // Redirige la raíz (/) al dashboard
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [GuardService], // Asegura que el guard se aplique a todas las rutas hijas
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [GuardService] // Asegura que también el dashboard esté protegido
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [GuardService] // Protege la ruta de usuarios
      },
      {
        path: 'matrices',
        component: MatricesComponent,
        canActivate: [GuardService] // Protege la ruta de matrices
      },
    ],
  },
  { path: '**', component: NotfoundComponent }, // Ruta para manejar páginas no encontradas
];


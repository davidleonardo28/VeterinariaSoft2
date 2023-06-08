import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'notFound',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () =>
      import('./auth/iniciar-sesion/iniciar-sesion.module').then(
        (m) => m.IniciarSesionModule
      ),
    canActivate: [CheckLoginGuard],
  },
  {
    path: 'registrarse',
    loadChildren: () =>
      import('./pages/registrarse/registrarse.module').then(
        (m) => m.RegistrarseModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cliente',
    loadChildren: () =>
      import('./pages/cliente/cliente.module').then((m) => m.ClienteModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

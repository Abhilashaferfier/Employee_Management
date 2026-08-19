import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: () =>
      import('./pages/public/public.module')
        .then(m => m.PublicModule)
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

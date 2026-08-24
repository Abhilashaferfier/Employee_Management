import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module')
        .then(m => m.AdminModule)
  },


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
    path: 'employee',
    loadChildren: () =>
      import('./pages/employee/employee.module')
        .then(m => m.EmployeeModule)
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

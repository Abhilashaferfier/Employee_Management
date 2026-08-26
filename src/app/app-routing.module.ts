import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

import { roleGuard } from './core/guards/role.guard';


const routes: Routes = [

  // =====================================================
  // ROOT
  // =====================================================

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  // =====================================================
  // PUBLIC
  // =====================================================

  {
    path: '',
    loadChildren: () =>
      import('./pages/public/public.module')
        .then(
          m => m.PublicModule
        )
  },


  // =====================================================
  // ADMIN
  // =====================================================

  {
    path: 'admin',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      role: 'ADMIN'
    },

    loadChildren: () =>
      import('./pages/admin/admin.module')
        .then(
          m => m.AdminModule
        )
  },


  // =====================================================
  // EMPLOYEE
  // =====================================================

  {
    path: 'employee',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      role: 'EMPLOYEE'
    },

    loadChildren: () =>
      import('./pages/employee/employee.module')
        .then(
          m => m.EmployeeModule
        )
  },


  // =====================================================
  // FALLBACK
  // =====================================================

  {
    path: '**',
    redirectTo: 'login'
  }

];


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {}
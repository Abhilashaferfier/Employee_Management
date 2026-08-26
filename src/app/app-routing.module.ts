import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { authGuard }
  from './guards/auth.guard';

import { roleGuard }
  from './guards/role.guard';

import {
  RoleSelectionComponent
} from './pages/public/role-selection/role-selection.component';


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
  // ROLE SELECTION
  // =====================================================

  /*
   * IMPORTANT:
   *
   * Login ke baad agar user ke paas
   * Admin + Employee dono roles hain,
   * to yahan aayega.
   *
   * Is route par roleGuard nahi lagana hai.
   *
   * Sirf authGuard chahiye,
   * kyunki user logged-in hona chahiye.
   */

  {
    path: 'role-selection',

    canActivate: [
      authGuard
    ],

    component:
      RoleSelectionComponent
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

    RouterModule.forRoot(
      routes
    )

  ],

  exports: [

    RouterModule

  ]

})
export class AppRoutingModule {}
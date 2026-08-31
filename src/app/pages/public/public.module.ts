import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RoleSelectionComponent } from './role-selection/role-selection.component';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

// Shared
import { SharedModule } from '../../shared/shared.module';


@NgModule({

  declarations: [

    LoginComponent,

    SignupComponent,

    RoleSelectionComponent

  ],

  imports: [

    // Angular
    CommonModule,

    FormsModule,

    ReactiveFormsModule,

    // Routing
    PublicRoutingModule,

    // PrimeNG
    ButtonModule,

    InputTextModule,

    PasswordModule,

    // Shared Header
    SharedModule

  ]

})
export class PublicModule {}
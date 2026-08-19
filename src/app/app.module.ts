import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSidebarComponent } from './menu/admin-sidebar/admin-sidebar.component';
import { EmployeeSidebarComponent } from './menu/employee-sidebar/employee-sidebar.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminSidebarComponent,
    EmployeeSidebarComponent,
    AdminLayoutComponent,
    EmployeeLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

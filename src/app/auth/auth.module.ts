import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';

import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './auth.service';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
  	AuthService
  ]
})
export class AuthModule { }

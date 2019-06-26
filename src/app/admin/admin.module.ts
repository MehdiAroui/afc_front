import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from '../material/material.module';
import { FormFieldsModule } from '../form-fields/form-fields.module';


import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { FluxComponent } from './flux/flux.component';
import { ReleaseComponent } from './release/release.component';
import { DeployComponent } from './deploy/deploy.component';
import { DashComponent } from './dash/dash.component';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
  	HomeComponent,
  	FluxComponent,
  	ReleaseComponent,
  	DeployComponent,
  	DashComponent,
  	UsersComponent,
  	AddUserComponent
  	],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AdminRoutingModule,
    MaterialModule,
    FormFieldsModule
  ],
  entryComponents: [
    AddUserComponent
  ]
})
export class AdminModule { }

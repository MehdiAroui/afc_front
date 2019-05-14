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

@NgModule({
  declarations: [
  	HomeComponent,
  	FluxComponent,
  	ReleaseComponent
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
  ]
})
export class AdminModule { }
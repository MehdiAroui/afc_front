import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FluxComponent } from './flux/flux.component';


import { NgProgressModule } from '@ngx-progressbar/core';
import { MaterialModule } from './material/material.module';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { FormFieldsModule } from './form-fields/form-fields.module';


import { AuthModule } from './auth/auth.module';

// Custom Services


@NgModule({
  declarations: [
    AppComponent,
    FluxComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgProgressModule,
    NgProgressHttpModule,
    FormFieldsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';


import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

// Custom Services


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgProgressModule,
    NgProgressHttpModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {    MatListModule, MatToolbarModule, MatSidenavModule, MatCardModule, 
        MatFormFieldModule, MatButtonModule, MatTableModule, MatDialogModule, 
        MatInputModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, 
        MatSnackBarModule, MatRadioModule, MatSelectModule, MatSortModule, MatGridListModule,
        MatExpansionModule, MatDatepickerModule, MatAutocompleteModule, MatMenuModule } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatMenuModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatMenuModule
  ]
})
export class MaterialModule { }

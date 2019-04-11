import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { EnumsToValuesPipe } from '../shared/pipes/enum-to-value.pipe';

import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';


@NgModule({
	declarations: [
		InputComponent, 
		SelectComponent, 
		DynamicFormsComponent, 
		DynamicFieldDirective,
		EnumsToValuesPipe
	],
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports : [
		InputComponent,
		SelectComponent
	]
})
export class FormFieldsModule {}

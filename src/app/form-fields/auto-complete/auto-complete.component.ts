import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

import { ApiService } from '../../shared/services/api.service';


export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutoCompleteComponent),
    multi: true
};

const noop = () => {
};


@Component({
  selector: 'app-complete',
  template: `
        <mat-form-field class="full-width">
            <input #input="ngModel" [placeholder]="placeholder" type="text" matInput [(ngModel)]="value"
             [matAutocomplete]="auto" [name]="name" [required]="required">
            <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete" (optionSelected)="onSelectOption()">
              <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                {{option}}
              </mat-option>
            </mat-autocomplete>
        </mat-form-field>
  `,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AutoCompleteComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input') input: NgModel;

  @Input() params = {};
  @Input() url;
  @Input() required = false;
  @Input() len;
  @Input() name;
  @Input() placeholder;
  @Output() onSelectChange: EventEmitter<string> = new EventEmitter<string>();
  options: string[];
  filteredOptions: Observable<string[]>;

  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
      return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
      if (v !== this.innerValue) {
          this.innerValue = v;
          this.onChangeCallback(v);
      }
  }

  constructor(private http : ApiService){}

  ngOnInit() {
    this.getData()
  }

  async getData(){
    await this.http.get<string[]>(this.url, this.params)
        .subscribe(
          data => this.options = data,
          err => alert("ERR")
        )

    this.filteredOptions = this.input.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return filterValue.length >= this.len ? this.options.filter(option => option.toLowerCase().indexOf(filterValue) >= 0) : [];
  }

  onSelectOption(){
    this.onSelectChange.emit(this.innerValue)
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
      if (value !== this.innerValue) {
          this.innerValue = value;
      }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
      this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
      this.onTouchedCallback = fn;
  }

}

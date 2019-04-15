import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MVSCible } from '../../shared/enums/mvs-cible.enum';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: []
})
export class SelectComponent implements OnInit {

	@Input() source : any;
	@Input() placeholder : String;
	@Input() bindTo  :any;
	@Input() disabled : boolean = false;
	@Output() onSelectEvent = new EventEmitter();

	constructor() {
	}

	ngOnInit() {
	}

	onSelect(){
		this.onSelectEvent.emit();
	}
}

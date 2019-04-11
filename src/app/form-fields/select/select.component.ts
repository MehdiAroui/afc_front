import { Component, OnInit, Input } from '@angular/core';

import { MVSCible } from '../../shared/enums/mvs-cible.enum';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: []
})
export class SelectComponent implements OnInit {

	@Input() source : any;
	@Input() placeholder : String;

	constructor() {
	}

	ngOnInit() {
	}

}

import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild
} from '@angular/animations';

import { Parameter } from '../../shared/models/parameter';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'translateY(30%)', opacity: 0 }),  // initial
        animate('.3s ease-in', 
          style({ transform: 'translateY(0)', opacity: 1 }))  // final
      ])
    ]),
    trigger('list', [
	  transition(':enter', [
	    query('@items', stagger(300, animateChild()))
	  ]),
	])
  ]
})
export class DeployComponent implements OnInit {

	_url : String = "/variables";
	vals : string[] = [];

    parameter: Parameter = new Parameter();

  	constructor(private api: ApiService) { }

  	ngOnInit() {
  	}

    getFlowInfos(flowName){

		let params = { params: new HttpParams().set('name', flowName)}
        this.api.get<Parameter>(this._url+"/search", params)
        .subscribe(
            (data) => {
              this.parameter = data;
            },
            err => console.log(err)
        )
	}

	add(){
		console.log(this.parameter);
	}
}

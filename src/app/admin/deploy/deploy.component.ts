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
import { GlobalVar } from '../../shared/models/globalvar';
import { Variable } from '../../shared/models/variable';

import { ApiService } from '../../shared/services/api.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'translateY(30%)', opacity: 0 }),  // initial
        animate('.2s ease-in', 
          style({ transform: 'translateY(0)', opacity: 1 }))  // final
      ])
    ]),
    trigger('list', [
	  transition(':enter', [
	    query('@items', stagger(200, animateChild()))
	  ]),
	])
  ]
})
export class DeployComponent implements OnInit {

	_url : String = "/variables";
	showList : boolean;

    parameter: Parameter = new Parameter();

  	constructor(private api: ApiService) { }

  	ngOnInit() {
        this.showList = false;
  	}

    getFlowInfos(flowName){

		let params = { params: new HttpParams().set('name', flowName)}

        this.api.get<Parameter>(this._url+"/search", params)
        .subscribe(
            (data) => {
                console.log(data);
              this.parameter = data;
            },
            err => console.log(err)
        );

        this.api.get<GlobalVar[]>(this._url+"/test", params)
            .subscribe(
                (data) => {
                    data.forEach( one => {
                        this.parameter.values.push(new Variable(one.name, one.description, one.value));
                    })
                    setTimeout(() => {
                        this.showList = true;
                    }, 1000)
                },
                err => console.log(err)
            )
	}

	add(){
		console.log(this.parameter);
	}
}

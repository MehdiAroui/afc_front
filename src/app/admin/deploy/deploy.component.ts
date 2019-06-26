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

import * as _ from 'lodash';

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

    async getFlowInfos(flowName){

		    let params = { params: new HttpParams().set('name', flowName)}
        let values = [];
        let vars = [];

        await this.api.get<Parameter>(this._url+"/search", params)
        .subscribe(
            (data) => {
                this.parameter= data;
                values = data.values;
            },
            err => console.log(err)
        );

        await this.api.get<GlobalVar[]>(this._url+"/test", params)
        .subscribe(
            (data) => {
                data.forEach( one => {
                    vars.push(new Variable(one.name, one.description, one.value));
                })
            },
            err => console.log(err)
        )

        setTimeout(() => {
            this.parameter.values = _.unionBy(vars, values, 'name');
            this.showList = true;
        }, 1000)
	}

	add(){
        console.log(this.parameter)
	}

}

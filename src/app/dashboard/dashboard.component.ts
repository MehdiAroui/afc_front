import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

import { MVSCible, Criticite, Denomination, Type, Planification } from '../shared/enums/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	title = '';
	name_flow = '';
	flow : Object = {
		"nom": "",
		"process": "",
		"appSource": "",
	 	"appCible": ""
	};
	operation = 'set your';


	mvs = MVSCible;
	planification = Planification;
	criticite = Criticite;
	denomination = Denomination;
	type_source= Type;
	type_cible = Type;
	
	
	constructor(private http: HttpClient){
	}
	
	getFlow(){
		let that = this;

		this.http.get(
			"http://localhost:8080/flows/search", 
			{ params: new HttpParams().set('name', this.flow.nom) }
		).subscribe(
			(data) => {
				console.log(data)
				if(data.nom == ""){
					/*let elts = that.flow.nom.split("-");
					that.flow.process = elts[0];
					that.flow.appSource = elts[1];
					that.flow.appCible = elts[2];*/

					that.operation = 'Add';
				}else{
					that.flow = data;
					that.operation = 'Update';
				}
			},
			(err) => {
				console.log(err);
				that.operation = 'ERR';
			}
		)
	}

	setFlowApps(e){
		let elts = this.flow.nom.split("-");

		if(elts[0]) this.flow.process 	= elts[0];
		if(elts[1]) this.flow.appSource = elts[1];
		if(elts[2]) this.flow.appCible 	= elts[2];

	}
}

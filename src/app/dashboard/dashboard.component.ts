import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

import { MVSCible, Criticite, Denomination, Type, Planification } from '../shared/enums/index';
import { Flow } from '../shared/models/flow';

import { ApiService } from '../shared/services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	_url = "/flows";

	step = 0;
	flow : Flow = new Flow();
	operation = 'set your';


	mvs 			= MVSCible;
	planification 	= Planification;
	criticite 		= Criticite;
	denomination 	= Denomination;
	type_source		= Type;
	type_cible 		= Type; 
	
	
	constructor(private api : ApiService){
	}

	getFlow(){
		this.api.get<Flow>(this._url+"/search", { params: new HttpParams().set('name', this.flow.nom) })
			.subscribe(
			(data) => {
				this.flow = data
				this.operation = data.index == 0 ? 'Création' : 'Évolution';
				this.step = 1
			}, 
			(err) => {
				console.log(err)
			});
	}

	sendFlow(){
		this.api.post<boolean>(this._url+"/post", this.flow)
			.subscribe(data => console.log(data), err => console.log(err));
	}

	setFlowApps(e){
		let elts = this.flow.nom.split("-");

		if(elts[0]) this.flow.processus				= elts[0];
		if(elts[1]) this.flow.application_source	= elts[1];
		if(elts[2]) this.flow.application_cible		= elts[2];
	}


	setStep(index: number) {
    	this.step = index;
	}

	nextStep() {
		console.log(this.flow)
	}

	someMethod(e){
		console.log(e)
	}
}

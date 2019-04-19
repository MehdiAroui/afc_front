import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import {MatSnackBar} from '@angular/material';

import { Flow } from '../shared/models/flow';
import { MVSCible, Criticite, Denomination, Type, Planification } from '../shared/enums/index';

import { ApiService } from '../shared/services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

	_url = "/flows";


	actual_name : String;
	actual_denomination : String;

	step = 0;
	flow : Flow = new Flow();
	operation = 'set your';


	mvs 			= MVSCible;
	planification 	= Planification;
	criticite 		= Criticite;
	denomination 	= Denomination;
	type_source		= Type;
	type_cible 		= Type; 
	
	
	constructor(private api : ApiService, private snackBar : MatSnackBar){
	}

	getFlow(){
		this.api.get<Flow>(this._url+"/search", { params: new HttpParams().set('name', this.flow.nom) })
			.subscribe(
			(data) => {
				this.storeOldValues(data);
				this.flow = data;
				this.operation = data.index == 0 ? 'Création' : 'Évolution';
				this.step = 1
			}, 
			(err) => {
				this.openSnackBar("Vérifier que le fichier n'est pas ouvert et ré-essayer", "Fermer")
			});
	}

	storeOldValues(data : Flow){
		this.actual_name = data.nom;
		this.actual_denomination = data.denomination;
	}

	sendFlow(){

		let method = (this.actual_name != this.flow.nom || this.actual_denomination != this.flow.denomination) 
					? "/disactivate" : "/post";

		this.api.post<boolean>(this._url+method, this.flow)
			.subscribe((data) => {
				let msg = data ? "Success" : "Vérifier que le fichier n'est pas ouvert et ré-essayer";
				this.openSnackBar(msg, "Fermer")
			}, err => console.log(err));
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

	someMethod(e){
		console.log(e)
	}

	openSnackBar(message: string, action: string) {
	    this.snackBar.open(message, action);
	}
}

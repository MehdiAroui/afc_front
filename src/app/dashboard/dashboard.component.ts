import { Component, OnInit, ViewChild, AfterViewInit, DoCheck } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import {MatSnackBar} from '@angular/material';

import { Flow } from '../shared/models/flow';
import { MVSCible, Criticite, Denomination, Type, Planification } from '../shared/enums/index';

import { ApiService } from '../shared/services/api.service';

import { SelectComponent } from '../form-fields/select/select.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, DoCheck {

	@ViewChild(SelectComponent) deno : SelectComponent;

	_url = "/flows";

	d_disabled : boolean = false;

	actual_nom : String;
	actual_denomination : String;

	isCreation : boolean = false;

	step = 0;
	flow : Flow = new Flow();
	operation = 'set your';

	elts : String[] = ["", "", ""]


	mvs 			= MVSCible;
	planification 	= Planification;
	criticite 		= Criticite;
	denomination 	= Denomination;
	type_source		= Type;
	type_cible 		= Type; 
	
	
	constructor(private api : ApiService, private snackBar : MatSnackBar){
		
	}

	ngAfterViewInit(){
		console.log(this.deno);
	}

	ngDoCheck(){
		
	}

	change(e) {
	    console.log(e);
	}

	getFlow(){
		this.api.get<Flow>(this._url+"/search", { params: new HttpParams().set('name', this.flow.nom) })
			.subscribe(
			(data) => {
				this.storeOldValues(data);
				this.flow = data;
				this.isCreation = data.index == 0;
				this.operation = this.isCreation ? 'Création' : 'Évolution';
				this.step = 1
			}, 
			(err) => {
				this.openSnackBar("Vérifier que le fichier n'est pas ouvert et ré-essayer", "Fermer")
			});
	}

	storeOldValues(data : Flow){
		this.actual_nom = data.nom;
		this.actual_denomination = data.denomination;
	}


	sendFlow(){
		let method = "/add";

		if(!this.isCreation) {
			method = "/edit";
		}

		if(!this.isCreation && this.actual_nom != this.flow.nom){
			method = "/disactivate"
		}

		this.api.post<boolean>(this._url+method, this.flow)
			.subscribe((data) => {
				let msg = data ? "Success" : "Vérifier que le fichier n'est pas ouvert et ré-essayer";
				this.openSnackBar(msg, "Fermer")
			}, err => console.log(err));

	}

	setFlowApps(e){
		let elts = this.flow.nom.split("-");

		this.flow.processus				= elts[0] ? elts[0] : "";
		this.flow.application_source	= elts[1] ? elts[1] : "";
		this.flow.application_cible		= elts[2] ? elts[2] : "";

		if(elts[2] == "ARTEMIS") {
			this.flow.denomination = Denomination.AP03;
			this.d_disabled = true;
		}else if(elts[1] == "ARTEMIS") {
			this.flow.denomination = Denomination.AP04;
			this.d_disabled = true;
			console.log(this.deno.value);
		}else {
			this.d_disabled = false;
		}
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

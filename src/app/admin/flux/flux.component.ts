import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MatSnackBar } from '@angular/material';

import { Flow } from '../../shared/models/flow';
import { MVSCible, Criticite, Denomination, Type, Planification } from '../../shared/enums/index';

import { ApiService } from '../../shared/services/api.service';

import { SelectComponent } from '../../form-fields/select/select.component';

@Component({
  selector: 'app-flux',
  templateUrl: './flux.component.html',
  styleUrls: ['./flux.component.scss']
})
export class FluxComponent {
	

	_url = "/flows";

	d_disabled : boolean = false;

	actual_nom : string;
	actual_denomination : string;
	actual_app_source : string;
	actual_app_cible : string;

	isCreation : boolean = false;

	step = 0;
	flow : Flow = new Flow();
	operation = '';

	elts : string[] = ["", "", ""]


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
		this.actual_app_source = data.application_source;
		this.actual_app_cible = data.application_cible;
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
		}else {
			this.d_disabled = false;
		}
	}

	setStep(index: number) {
    	this.step = index;
	}

	onDenoChange(denomination){

		if(denomination == Denomination.AP03) {
			this.flow.application_source = this.actual_app_source;
			this.flow.application_cible = "ARTEMIS"
		}
		if(denomination == Denomination.AP04) {
			this.flow.application_source = "ARTEMIS"
			this.flow.application_cible = this.actual_app_cible
		}

		this.flow.nom = [this.flow.processus, this.flow.application_source, this.flow.application_cible].join("-");
	}

	openSnackBar(message: string, action: string) {
	    this.snackBar.open(message, action);
	}
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

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
	showAll = false;
	
	
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
				that.showAll = true;
			},
			(err) => {
				console.log(err);
				that.operation = 'ERR';
			}
		)
		
	}
}

import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

import { Operation } from '../models/operation';

@Injectable({
	providedIn: 'root'
})
export class OperationService {

	constructor(private api: ApiService){}

	createOne(description : string){
		let op : Operation = new Operation(description);

		let userId = localStorage.getItem('userID');

		 
		return this.api.post(`/operations/${userId}`, op)
	}
}
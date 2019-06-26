import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
	providedIn: 'root'
})
export class ApiService {

	apiUrl = 'http://localhost:8080';
	headers : HttpHeaders = new HttpHeaders()
								.set('Content-Type', 'application/json')
								.set('Accept', 'application/json');

	options = {headers : this.headers};


	constructor(private http : HttpClient){}

	get<T>(url, config : any = {}) : any{

		return this.http.get<T>(this.apiUrl+url, {...config, ...this.options})
		.pipe(
			retry(2),
			catchError(this.handleError)
		)
	}

	post<T>(url, data, config = {}) : any{
		return this.http.post<T>(this.apiUrl+url, data, {...config, ...this.options})
		.pipe(
			catchError(this.handleError)
		)
	}


	handleError(error) {
		let errorMessage = '';

		if(error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(errorMessage);
	}

}
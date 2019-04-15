import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
	providedIn: 'root'
})
export class ApiService {

	apiUrl = 'http://localhost:8080';


	constructor(private http : HttpClient){}

	get<T>(url, options : any = {}) : Observable<T>{

		return this.http.get<T>(this.apiUrl+url, options)
		.pipe(
			retry(1),
			catchError(this.handleError)
		)
	}

	post<T>(url, data, options = {}){
		return this.http.post<T>(this.apiUrl+url, data, options)
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
		window.alert(errorMessage);
		return throwError(errorMessage);
	}

}
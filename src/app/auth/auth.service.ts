import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Token } from '../shared/models/token';
import { ApiService } from '../shared/services/api.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<Token>;
    public currentUser: Observable<Token>;

	// store the URL so we can redirect after logging in
	static redirectUrl: string;

	baseUrl : string = "http://localhost:8080/users";

	headers : HttpHeaders = new HttpHeaders()
								.set('Content-Type', 'application/json')
								.set('Accept', 'application/json');

	options = {headers : this.headers};

  	constructor(private http: HttpClient) {
  		this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('authUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  	}

  	get currentUserValue(): Token {
        return this.currentUserSubject.value;
    }

	makeQuery(data : any, login : boolean = true) : Observable<any> {
		let url = login ? this.baseUrl+'/login' : this.baseUrl+'/register';
		console.log(data, 'inside service');
		return this.http.post<Token>(url, data, this.options)
			.pipe(map((res) => {
				console.log(res);
				if ( res && res.token){
					
					localStorage.setItem('authUser', JSON.stringify(res.user));
					localStorage.setItem('authJwt', JSON.stringify(res.token));
					this.currentUserSubject.next(res.user);
				}
			}))
	}

	isLoggedIn() : boolean {
		return this.currentUserValue != null;
	}

  	logout(): void {
    	localStorage.removeItem('authUser');
        this.currentUserSubject.next(null);
  	}
}

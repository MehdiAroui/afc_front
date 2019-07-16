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
  		this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('authObj')));
        this.currentUser = this.currentUserSubject.asObservable();
  	}

  	get currentUserValue(): Token {
        return this.currentUserSubject.value;
    }

	makeQuery(data : any, login : boolean = true) : Observable<any> {
		let url = login ? this.baseUrl+'/login' : this.baseUrl+'/register';
		
		return this.http.post<Token>(url, data, this.options)
			.pipe(map((res) => {
				if ( res && res.token){
					
					localStorage.setItem('authObj', JSON.stringify(res));
					localStorage.setItem('authJwt', JSON.stringify(res.token));
					localStorage.setItem('userID', JSON.stringify(res.userId));
					this.currentUserSubject.next(res);
				}
			}))
	}

	isLoggedIn() : boolean {
		return this.currentUserValue != null;
	}

  	logout(): void {
    	localStorage.removeItem('authObj');
    	localStorage.removeItem('authJwt');
        this.currentUserSubject.next(null);
  	}
}

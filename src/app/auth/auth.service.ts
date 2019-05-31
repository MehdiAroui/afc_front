import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '../shared/models/token';
import { User } from '../shared/models/user';

@Injectable()
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

	// store the URL so we can redirect after logging in
	static redirectUrl: string;

	baseUrl : string = "http://localhost:8000/auth"

  	constructor(private http: HttpClient) {
  		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('authUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  	}

  	get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

	makeQuery(object : any, login : boolean) : Observable<any> {
		let url = login ? this.baseUrl+'/login' : this.baseUrl+'/register';

		return this.http.post<User>(url, object)
			/*.pipe(map((res) => {
				if ( res && res.token){
					localStorage.setItem('authUser', JSON.stringify(res.user))
					localStorage.setItem('authJwt', JSON.stringify(res.token))
					this.currentUserSubject.next(res.user);
				}
			}))*/
	}

	isLoggedIn() : boolean {
		return this.currentUserValue != null;
	}

  	logout(): void {
    	localStorage.removeItem('authUser');
        this.currentUserSubject.next(null);
  	}
}

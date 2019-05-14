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

	baseUrl : string = "http://localhost:8000/api/"

  	constructor(private http: HttpClient) {
  		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('authUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  	}

  	get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  	/*login(email: string, password: string): Observable<void> {
		return this.http.post<Token>(this.baseUrl+'auth/login', {email, password})
			.pipe(map((res) => {
				if ( res && res.token){
					localStorage.setItem('authUser', JSON.stringify(res.user))
					localStorage.setItem('authJwt', JSON.stringify(res.token))
					this.currentUserSubject.next(res.user);
				}
			}))
	}*/

	makeQuery(object : any, login : boolean) : Observable<void> {
		let url = login ? this.baseUrl+'auth/login' : this.baseUrl+'auth/register'
		return this.http.post<Token>(url, object)
			.pipe(map((res) => {
				if ( res && res.token){
					localStorage.setItem('authUser', JSON.stringify(res.user))
					localStorage.setItem('authJwt', JSON.stringify(res.token))
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

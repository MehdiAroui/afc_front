import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            /*request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`,
                    Content-Type: 'application/json',
                    Accept: 'application/json'
                }
            });*/
            request = request.clone({
                headers: request.headers
                            .set('Authorization', `Bearer ${currentUser.token}`)
                            .set('Content-Type', 'application/json')
                            .set('Accept', 'application/json')
            });
        }

        return next.handle(request);
    }
}
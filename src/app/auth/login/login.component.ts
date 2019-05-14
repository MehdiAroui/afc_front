import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
	
	hide : boolean = true;

  	constructor(private authService : AuthService, public router: Router) { }

  	ngOnInit() {
  	}

    getErrorMessage() {
    	return this.email.hasError('required') ? 'You must enter a value' :
        		this.email.hasError('email') ? 'Not a valid email' :
            	'';
  	}

    login(){

        let url = AuthService.redirectUrl;
        let email = this.email.value,
            password = this.password.value
        let _that = this;

        this.authService.makeQuery({ email,password}, true)
          .subscribe(
            data => _that.router.navigate(['/']))
    }

    signup(){
      this.router.navigate(['/register'])
    }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
	returnUrl : string;
	hide : boolean = true;
  message : string = "";

  	constructor(
      private authService : AuthService, 
      public router: Router, 
      private route: ActivatedRoute
    ){}

  	ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/accueil';
  	}

    getErrorMessage() {
    	return this.email.hasError('required') ? 'You must enter a value' :
        		this.email.hasError('email') ? 'Not a valid email' :
            	'';
  	}

    login(){

      let email = this.email.value,
          password = this.password.value;


      this.authService.makeQuery({ email,password })
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl])
          },
          (err) => this.message = "les identifiants sont incorrects"
        );
    }

    signup(){
      this.router.navigate(['/register'])
    }


}

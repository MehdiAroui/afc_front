import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../shared/models/user';

import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  svnLogin : FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
	email : FormControl = new FormControl('', [Validators.required, Validators.email]);
  password : FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  hide : boolean = true;

  constructor(private api : ApiService, public router: Router) { }

  ngOnInit() {
  }

  signUp(){

  	let svnLogin = this.svnLogin.value,
  			email = this.email.value,
  			password = this.password.value,
  			_that = this;
    let user = new User(svnLogin, email, password);

    let url = "/auth/register";

  		this.api.post<User>(url, user, false)
          .subscribe(
            data => _that.router.navigate(['/flux']),
            err => console.log(err));
  }

  getErrorMessage() {
  	return this.email.hasError('required') ? 'You must enter a value' :
      		this.email.hasError('email') ? 'Not a valid email' :
          	'';
  }


}

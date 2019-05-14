import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name : FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
	email : FormControl = new FormControl('', [Validators.required, Validators.email]);
  password : FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  hide : boolean = true;

  constructor(private authService : AuthService, public router: Router) { }

  ngOnInit() {
  }

  signUp(){

  	let name = this.name.value,
  			email = this.email.value,
  			password = this.password.value,
  			_that = this

  		this.authService.makeQuery({ name, email, password}, false)
          .subscribe(
            data => _that.router.navigate(['/']))
  }

  getErrorMessage() {
  	return this.email.hasError('required') ? 'You must enter a value' :
      		this.email.hasError('email') ? 'Not a valid email' :
          	'';
  }


}

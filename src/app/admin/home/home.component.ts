import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/auth.service';
import { Token } from '../../shared/models/token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	CurrentUser : Token = new Token();

	constructor(private authenticationService: AuthService) { }

	ngOnInit() {
		this.CurrentUser = this.authenticationService.currentUserValue;
  	}

  	logOut(){
  		this.authenticationService.logout();
  		location.reload();
  	}

}

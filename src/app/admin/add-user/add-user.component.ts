import { Component, OnInit } from '@angular/core';

import { User } from '../../shared/models/user';
import { Role } from '../../shared/models/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

	user : User = new User();
	passConfirm : string = "";
	role : string = "";

	errors : string[] = []

	constructor(){}

	ngOnInit() {
	}

	checkRoles(roleNum : number){

		this.role = roleNum == 1 ? 'DEV' : 'ADMIN';

		this.user.roles = [];
		this.user.roles.push(new Role('DEV'))

		if(roleNum != 1)
			this.user.roles.push(new Role('ADMIN'))
	}

}

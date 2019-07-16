export class Token {
	token : string;
	userName : string;
	userEmail : string;
	role : string;
	userId : number;

	constructor(){
		this.token = '';
		this.userName = '';
		this.userEmail = '';
		this.role = '';
		this.userId = 0;
	}
}
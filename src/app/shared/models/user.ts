export class User {
	index: number;
    svnLogin: string;
    email: string;
    password: string;

    constructor(svn : string, email : string, password : string, index : number = 0){
    	this.index = index;
    	this.svnLogin = svn;
    	this.email = email;
    	this.password = password;
    }
}
import { Role } from './role';

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    isEnabled: boolean;
    roles: Role[] = [];

    constructor(name : string = "", email : string= "", password : string = "", isEnabled : boolean = false){
        this.id = null;
    	this.name = name;
    	this.email = email;
    	this.password = password;
        this.isEnabled = isEnabled;
    }
}
export class Variable {
	name: string;
	description: string;
	dev_value: string;
	int_value: string;
	activated: boolean;

	/*constructor(){
		this.name="";
		this.description="";
		this.dev_value="";
		this.int_value="";
		this.activated = false
	}*/

	constructor(name, description,value){
		this.name=name;
		this.description = description;
		this.dev_value = value;
		this.int_value = value;
		this.activated = true;
	}
}
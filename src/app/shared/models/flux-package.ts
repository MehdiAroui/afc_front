import { Config } from './config';

export class FluxPackage{
	index : number;
	flow_name : string;
	package_name : string;
	configs : Config[];

	constructor(){
		this.index = 0;
		this.flow_name = "";
		this.package_name = "";
		this.configs = [];
	}
}
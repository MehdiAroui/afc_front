import { Config } from './config';

export class FluxPackage{
	index : number;
	flux_name : string;
	package_name : string;
	configs : Config[];

	constructor(){
		this.index = 0;
		this.flux_name = "";
		this.package_name = "";
		this.configs = [];
	}
}
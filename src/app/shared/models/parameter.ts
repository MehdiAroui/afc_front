import { Variable } from './variable';

export class Parameter{
	index: number;
	champ: string;
	description: string;
	values : Variable[];

	constructor(){
		this.index = 0;
		this.champ = "";
		this.description = "";
		this.values = [];
	}
}
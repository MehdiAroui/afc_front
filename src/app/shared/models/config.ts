export class Config{
	cellIndex : number;
	name : string;
	version_courante : string;
	version_cible : string;
	etat : string;

	constructor(index : ?number){
		this.cellIndex = index ? index : 0;
		this.name = "";
		this.version_courante = "";
		this.version_cible = "";
		this.etat = "";
	}
}


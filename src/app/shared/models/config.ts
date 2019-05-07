export class Config{
	cellIndex : number;
	name : string;
	version_courante : string;
	version_cible : string;
	etat : string;

	constructor(index : number = 0){
		this.cellIndex = index;
		this.name = "";
		this.version_courante = "";
		this.version_cible = "";
		this.etat = "";
	}
}


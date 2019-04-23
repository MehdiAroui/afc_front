export class Flow {
  index : number = 0;
  nom: string = null;
  description_demi_flux: string = null;
  processus: string = null;
  description_flux: string = null;
  application_source: string = null;
  application_cible: string = null;
  partimoine_source: string = null;
  version_ci_trunk: string = null;
  version_ci_correction: string = null;
  projet_tibco: string = null;
  objet_manipule: string = null;
  denomination: string = null;
  type_source: string = null;
  type_cible: string = null;
  mvs_cible: string = null;
  planification: string = null;
  delai: number = 0;
  criticite: string = null;

  constructor(){
  	this.index = 0;
  	this.nom = null;
  	this.description_demi_flux = null;
  	this.processus = "";
  	this.description_flux = null;
  	this.application_source = "";
  	this.application_cible = "";
  	this.partimoine_source = null;
  	this.version_ci_trunk = null;
  	this.version_ci_correction = null;
  	this.projet_tibco = null;
  	this.objet_manipule = null;
  	this.denomination = null;
  	this.type_source = null;
  	this.type_cible = null;
  	this.mvs_cible = null;
  	this.planification = null;
  	this.delai = 0;
  	this.criticite = null;
  }
}
import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Etat } from '../shared/enums/index';
import { FluxPackage } from '../shared/models/flux-package';
import { Config } from '../shared/models/config';
import { ApiService } from '../shared/services/api.service';

import { AutoCompleteComponent } from '../form-fields/auto-complete/auto-complete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('auto') autoComp : AutoCompleteComponent;

  _url = "/release";

  flux_package : FluxPackage = new FluxPackage();
  isCreation : boolean = false;

  etat = Etat;

  env : string = "ih";
  packageParams = { params: new HttpParams().set('env', this.env) }

  constructor(private api : ApiService){}

  ngOnInit() {
  }

  sendData(){

    console.log(this.flux_package);

    let method = "/edit";

    if(this.isCreation) method = "/add";

    let params = { params: new HttpParams().set('env', this.env) }

    this.api.post<boolean>(this._url+method, this.flux_package, params)
            .subscribe(
              data => console.log(data),
              err => console.log(err)
            )
  }

  getFlowInfos(flowName){

    let params = { params: new HttpParams().set('name', flowName).set('env', this.env) }
    this.api.get<FluxPackage>(this._url+"/search", params)
              .subscribe(
                (data) => {
                  this.flux_package = data;
                  this.isCreation = this.flux_package.index == 0;
                  if(this.isCreation) this.setConfigs()
                },
                err => console.log(err)
              )
  }

  onChange(){

    this.autoComp.params = { params: new HttpParams().set('env', this.env) }
    this.autoComp.getData();
  }

  setConfigs(){
    this.flux_package.configs.push(new Config(3))

    /*if(this.env == "ih"){
      this.flux_package.configs.push(new Config(7))
    }*/
  }



}
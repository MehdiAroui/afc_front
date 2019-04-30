import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../shared/services/api.service';
import { FluxPackage } from '../shared/models/flux-package';

import { AutoCompleteComponent } from '../form-fields/auto-complete/auto-complete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('autoComp') autoComp : AutoCompleteComponent;

  _url = "/release";

  flux_package : FluxPackage = new FluxPackage();

  val1 : string = "";
  val2 : string = "";
  version : string = "";
  env : string = "d";
  PackageParams = { params: new HttpParams().set('env', this.env) }

  constructor(private http : ApiService){}

  ngOnInit() {
  }

  print(){
    console.log(this.val1, this.val2, this.version)
  }

  getFlowInfos(flowName){
    console.log(flowName);
    let params = { params: new HttpParams().set('name', flowName).set('env', this.env) }
    this.http.get<FluxPackage>(this._url+"/search", params)
              .subscribe(
                data => this.flux_package = data,
                err => console.log(err)
              )
  }

  onChange(){
    this.val2 = "";
    this.autoComp.params = { params: new HttpParams().set('env', this.env) }
    this.autoComp.getData();
  }

}
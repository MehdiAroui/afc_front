import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  val1 : string = "";
  val2 : string = "";


  ngOnInit() {
  }

  print(){
    console.log(this.val1, this.val2)
  }

}
import { Component, OnInit } from '@angular/core';
import { MVSCible } from '../shared/enums/mvs-cible.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mvs = MVSCible;

  constructor() { }

  ngOnInit() {
  }

}

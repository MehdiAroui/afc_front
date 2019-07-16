import {Component, AfterViewInit , ViewChild } from '@angular/core';

import {MatTableDataSource, MatSort, MatPaginator, PageEvent, MatDialog, MatTable, MatSnackBar} from '@angular/material';

import { ApiService } from '../../shared/services/api.service';

import { HttpParams } from '@angular/common/http';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, reduce, startWith, switchMap} from 'rxjs/operators';

import { Flux } from '../../shared/models/flux';

import * as _ from 'lodash';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements AfterViewInit {

  displayedColumns: string[] = ['nom', 'apps','description_flux', 'denomination'];

	dataSource = new MatTableDataSource<Flux>([]);
	allData : any;

	isLoadingResults : boolean;
	pageIndex : number = 0;
	pageSize : number = 5;
	totalElements : number = 0;


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatTable) table: MatTable;

	pageEvent: PageEvent;

 	constructor(
 		private http: ApiService, 
 		public dialog: MatDialog, 
 		private snackBar : MatSnackBar
 	) {
 	}

	ngAfterViewInit(){
		merge(this.sort.sortChange, this.paginator.page)
		.pipe(
			startWith({}),
			switchMap(() => {
				this.isLoadingResults = true;
				return this.getUsers();
			}),
	        catchError(() => {
				this.isLoadingResults = false;
				return observableOf([]);
	        })
		)
		.subscribe(data => {
			if(data != {})
				{
					this.dataSource.data = data.content;
					this.totalElements = data.totalElements;
				}
		});
	}

	getUsers(){
		if(this.pageEvent){
			this.pageIndex = this.pageEvent.pageIndex;
			this.pageSize = this.pageEvent.pageSize;
		}
		return this.http.get("/flows", 
			{ 
				params: new HttpParams()
						.set('page', this.pageIndex)
						.set('size', this.pageSize) 
			}
		)
	}

	applyFilter(filterValue: string) {
		console.log(filterValue)
		this.dataSource.filter = filterValue.trim().toLowerCase();

		merge(this.dataSource.filter)
			.pipe(
				switchMap(() => {
					this.isLoadingResults = true;
					return this.http.get('/flows/search', { params: new HttpParams().set('name', filterValue.trim().toLowerCase())});
				}),
				catchError(() => {
					this.isLoadingResults = false;
					return observableOf([]);
		        })
			)
			.subscribe((data) => {
				this.dataSource.data = data.content
			});

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}

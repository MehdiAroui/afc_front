import {Component, AfterViewInit , ViewChild } from '@angular/core';

import {MatTableDataSource, MatSort, MatPaginator, PageEvent, MatDialog, MatTable, MatSnackBar} from '@angular/material';

import { ApiService } from '../../shared/services/api.service';

import { HttpParams } from '@angular/common/http';

import { AddUserComponent } from '../add-user/add-user.component';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, reduce, startWith, switchMap} from 'rxjs/operators';

import { User } from '../../shared/models/user';

import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
	displayedColumns: string[] = ['name', 'email', 'active', 'actions'];

	dataSource = new MatTableDataSource<User>([]);
	allData : any;

	isLoadingResults : boolean;
	pageIndex : number = 0;
	pageSize : number = 3;
	totalElements : number = 0;


	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatTable) table: MatTable;

	pageEvent: PageEvent;

 	constructor(private http: ApiService, public dialog: MatDialog, private snackBar : MatSnackBar) {
 	}

	ngAfterViewInit(){
		merge(this.sort.sortChange, this.paginator.page)
		.pipe(
			startWith({}),
			switchMap(() => {
				this.isLoadingResults = true;
				console.log(this.pageEvent)
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
					this.dataSource.data = data._embedded.users;
					this.totalElements = data.page.totalElements;
				}
		});
	}

	getUsers(){
		if(this.pageEvent){
			this.pageIndex = this.pageEvent.pageIndex;
			this.pageSize = this.pageEvent.pageSize;
		}
		return this.http.get("/users", { params: new HttpParams().set('page', this.pageIndex).set('size', this.pageSize) })
	}

	applyFilter(filterValue: string) {
		console.log(filterValue)
		this.dataSource.filter = filterValue.trim().toLowerCase();

		merge(this.dataSource.filter)
			.pipe(
				switchMap(() => {
					this.isLoadingResults = true;
					return this.http.get('/users/search/findByNameIgnoreCaseContaining', { params: new HttpParams().set('name', filterValue.trim().toLowerCase())});
				}),
				catchError(() => {
					this.isLoadingResults = false;
					return observableOf([]);
		        })
			)
			.subscribe((data) => {
				this.dataSource.data = data._embedded.users
			});

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	openDialog() {
		const dialogRef = this.dialog.open(AddUserComponent);

		dialogRef.afterClosed().subscribe((result : User) => {
			if(result){
				this.http.post("/users/add", result).subscribe(
					data => {
						this.dataSource.data.push(data);
						this.table.renderRows();
					},
					err => console.log(err)
				)
			}
			
		});
	}

	changeState(id : number){
		this.http.get(`/users/activate/${id}`)
			.subscribe(
				data => {
					//TODO:: Add message to inform User
				}
			)
	}

	delete(id : number){
		this.http.get(`/users/delete/${id}`)
			.subscribe(
				data => {
					_.remove(this.dataSource.data, function(one){
						return one.id == id;
					})
					this.table.renderRows();
					this.snackBar.open("user deleted", "Fermer");
				}
			)
	}

}

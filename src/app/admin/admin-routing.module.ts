import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FluxComponent } from './flux/flux.component';
import { ReleaseComponent } from './release/release.component';
import { HomeComponent } from './home/home.component';
import { DeployComponent } from './deploy/deploy.component';
import { DashComponent } from './dash/dash.component';
import { UsersComponent } from './users/users.component';
import { OperationComponent } from './operation/operation.component';

import { AuthGuard } from '../auth/auth-guard';

const routes: Routes = [
	{
		path : "",
		component: HomeComponent,
        canActivate: [AuthGuard],
		children : [
			{
        		path: 'accueil',
        		component: DashComponent,
    		},
            {
                path: 'flux',
                component: FluxComponent,
            },
			{
        		path: 'livrable',
        		component: ReleaseComponent,
    		},
			{
        		path: 'deploy',
        		component: DeployComponent,
    		},
            {
                path: 'utilisateurs',
                component: UsersComponent,
            },
            {
                path: 'operations',
                component: OperationComponent,
            }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
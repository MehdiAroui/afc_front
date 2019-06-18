import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FluxComponent } from './flux/flux.component';
import { ReleaseComponent } from './release/release.component';
import { HomeComponent } from './home/home.component';
import { DeployComponent } from './deploy/deploy.component';
import { DashComponent } from './dash/dash.component';

const routes: Routes = [
	{
		path : "",
		component: HomeComponent,
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
    		}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

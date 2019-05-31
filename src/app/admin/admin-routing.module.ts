import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FluxComponent } from './flux/flux.component';
import { ReleaseComponent } from './release/release.component';
import { HomeComponent } from './home/home.component';
import { DeployComponent } from './deploy/deploy.component';

const routes: Routes = [
	{
		path : "",
		component: HomeComponent,
		children : [
			{
        		path: 'flux',
        		component: FluxComponent,
    		},
			{
        		path: 'release',
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

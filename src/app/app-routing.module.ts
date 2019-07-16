import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: './admin/admin.module#AdminModule'
	},
	{
		path: 'auth',
		loadChildren: './auth/auth.module#AuthModule'
	},
	{
		path: '',
		redirectTo: '/accueil',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
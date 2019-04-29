import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { FluxComponent } from './flux/flux.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{path: "", redirectTo: "/flux", pathMatch: "full"},
	{path : "flux", component: FluxComponent},
	{path : "home", component: HomeComponent},
	{path : "dash", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
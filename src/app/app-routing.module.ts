import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // import routing functionality

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Configuration of the routes
const routes: Routes = [
  // Add a default route to make the app navigate to the dashboard automatically
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Add a route that matches a path to the DashboardComponent
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // configure the router at the application's root level
  exports: [RouterModule], // exports RouterModule so it will be available throughout the app
})

export class AppRoutingModule { }

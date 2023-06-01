import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessLevelComponent } from './pages/access-level/access-level.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'access-level',
		pathMatch: 'full',
	},
	{
		path: 'access-level',
		component: AccessLevelComponent,
	},
	{
		path: 'users',
		component: UsersComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}

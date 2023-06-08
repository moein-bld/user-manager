import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessLevelComponent } from './pages/access-level/access-level.component';
import { UsersComponent } from './pages/users/users.component';
import { MainComponent } from './containers/main/main.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

const routes: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
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
			{
				path: 'edit-profile',
				component: EditProfileComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}

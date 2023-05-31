import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full',
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
	},

	{
		path: 'not-found',
		loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule),
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: '/not-found',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

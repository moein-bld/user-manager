import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-router.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
	declarations: [],
	imports: [SharedModule, DashboardRoutingModule, PagesModule],
})
export class DashboardModule {}

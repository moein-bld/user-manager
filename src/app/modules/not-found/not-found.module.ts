import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-router.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
	declarations: [],
	imports: [CommonModule, NotFoundRoutingModule, PagesModule],
})
export class NotFoundModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AuthRoutingModule } from './auth-router.module';

@NgModule({
	imports: [SharedModule, AuthRoutingModule, PagesModule],
})
export class AuthModule {}

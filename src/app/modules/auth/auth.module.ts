import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AuthRoutingModule } from './auth-router.module';
import { AuthService } from 'src/app/shared/services/auth.service';

@NgModule({
	imports: [SharedModule, AuthRoutingModule, PagesModule],
})
export class AuthModule {}

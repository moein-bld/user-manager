import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

const Pages = [SignInComponent, SignUpComponent];

@NgModule({
	imports: [SharedModule, ComponentsModule],
	declarations: [...Pages],
	exports: [...Pages],
})
export class PagesModule {}

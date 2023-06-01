import { NgModule } from '@angular/core';
import { AccessLevelComponent } from './access-level/access-level.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components/components.module';

const Pages = [AccessLevelComponent, UsersComponent]

@NgModule({
	imports: [SharedModule, ComponentsModule],
	declarations: [...Pages],
	exports: [...Pages],
})
export class PagesModule {}

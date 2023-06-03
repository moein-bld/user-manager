import { NgModule } from '@angular/core';
import { AccessLevelComponent } from './access-level/access-level.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';

const Pages = [AccessLevelComponent, UsersComponent];

@NgModule({
	imports: [SharedModule, ComponentsModule, FormsModule],
	declarations: [...Pages],
	exports: [...Pages],
})
export class PagesModule {}

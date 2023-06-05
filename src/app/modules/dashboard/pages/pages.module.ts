import { NgModule } from '@angular/core';
import { AccessLevelComponent } from './access-level/access-level.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';

const Pages = [AccessLevelComponent, UsersComponent];

@NgModule({
	imports: [SharedModule, ComponentsModule, FormsModule, CommonModule, SharedComponentsModule],
	declarations: [...Pages],
	exports: [...Pages],
})
export class PagesModule {}

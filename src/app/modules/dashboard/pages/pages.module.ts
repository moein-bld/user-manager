import { NgModule } from '@angular/core';
import { AccessLevelComponent } from './access-level/access-level.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const Pages = [AccessLevelComponent, UsersComponent, EditProfileComponent];

@NgModule({
	imports: [SharedModule, ComponentsModule, FormsModule, CommonModule, SharedComponentsModule, ReactiveFormsModule],
	declarations: [...Pages],
	exports: [...Pages],
})
export class PagesModule {}

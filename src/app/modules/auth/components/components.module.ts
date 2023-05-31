import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';

const Components = [AuthFormComponent];

@NgModule({
	imports: [CommonModule, SharedModule, FormsModule],
	declarations: [...Components],
	exports: [...Components],
})
export class ComponentsModule {}

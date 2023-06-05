import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GHeaderComponent } from './g-header/g-header.component';
import { SharedModule } from 'src/app/shared/shared.module';

const Components = [GHeaderComponent];

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [...Components],
	exports: [...Components],
})
export class ComponentsModule {}

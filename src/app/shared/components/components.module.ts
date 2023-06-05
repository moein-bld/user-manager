import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { SharedModule } from '../shared.module';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [ActionBarComponent],
	exports: [ActionBarComponent],
})
export class SharedComponentsModule {}

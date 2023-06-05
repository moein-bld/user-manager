import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedComponentsModule } from 'src/app/shared/components/components.module';

@NgModule({
	imports: [CommonModule, AppRoutingModule, ComponentsModule, SharedModule, SharedComponentsModule],
	declarations: [MainComponent],
	exports: [MainComponent],
})
export class ContainersModule {}

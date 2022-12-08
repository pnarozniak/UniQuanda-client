import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [CommonModule, SharedModule],
	declarations: [HomeComponent],
})
export class HomeModule {}

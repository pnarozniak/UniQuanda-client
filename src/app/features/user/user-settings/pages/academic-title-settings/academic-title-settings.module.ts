import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AcademicSettingsComponent } from './academic-title-settings.component';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { TitleRequestHistoryComponent } from './components/title-request-history/title-request-history.component';
import { TitleOrderComponent } from './components/title-order/title-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
	{
		path: '',
		component: AcademicSettingsComponent,
		data: { title: 'Tytuły naukowe' },
	},
];

@NgModule({
	declarations: [
		AcademicSettingsComponent,
		TitleFormComponent,
		TitleOrderComponent,
		TitleRequestHistoryComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		RouterModule.forChild(routes),
		SharedModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatChipsModule,
		DragDropModule,
		MatTooltipModule,
	],
})
export class AcademicTitleSettingsModule {}

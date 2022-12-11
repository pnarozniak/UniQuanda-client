import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailsComponent } from './question-details.component';
import { QuestionDetailsApiService } from './services/question-details-api.service';
import { QuestionDetailsDesktopHeaderComponent } from './components/question-details-desktop-header/question-details-desktop-header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { QuestionDetailsHeaderSettingsComponent } from './components/question-details-header-settings/question-details-header-settings.component';
import { QuestionDetailsTagsComponent } from './components/question-details-tags/question-details-tags.component';
import { QuestionDetailsInfoComponent } from './components/question-details-info/question-details-info.component';

const routes: Routes = [
	{
		path: '',
		component: QuestionDetailsComponent,
		data: { title: 'Szczegóły pytania' },
	},
];

@NgModule({
	declarations: [
		QuestionDetailsComponent,
		QuestionDetailsDesktopHeaderComponent,
		QuestionDetailsHeaderSettingsComponent,
		QuestionDetailsTagsComponent,
		QuestionDetailsInfoComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		RouterModule.forChild(routes),
		SharedModule,
		BsDropdownModule.forRoot(),
	],
	providers: [QuestionDetailsApiService],
})
export class QuestionDetailsModule {}

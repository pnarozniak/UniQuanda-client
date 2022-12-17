import { AnswerFormComponent } from './components/answer-form/answer-form.component';
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
import { AnswersApiService } from './services/answers-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnswerDetailsComponent } from './components/answer-details/answer-details.component';
import { AnswerDetailsHeaderComponent } from './components/answer-details-header/answer-details-header.component';
import { AnswerDetailsInfoComponent } from './components/answer-details-info/answer-details-info.component';
import { QuestionAnswersComponent } from './components/question-answers/question-answers.component';

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
		AnswerFormComponent,
		AnswerDetailsComponent,
		AnswerDetailsHeaderComponent,
		AnswerDetailsInfoComponent,
		QuestionAnswersComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		RouterModule.forChild(routes),
		SharedModule,
		BsDropdownModule.forRoot(),
		MatFormFieldModule,
	],
	providers: [QuestionDetailsApiService, AnswersApiService],
})
export class QuestionDetailsModule {}

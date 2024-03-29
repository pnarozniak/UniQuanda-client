import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question.component';
import { LimitExceededComponent } from './pages/limit-exceeded/limit-exceeded.component';
import { QuestionDetailsForUpdateResolver } from './resolvers/question-details-for-update.resolver';

const routes: Routes = [
	{
		path: '',
		component: AskQuestionComponent,
		data: { title: 'Zadaj pytanie' },
		resolve: {
			question: QuestionDetailsForUpdateResolver,
		},
	},
	{
		path: 'limit-exceeded',
		component: LimitExceededComponent,
		data: { title: 'Limit zadawania pyta� przekroczony' },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class AskQuestionRoutingModule {}

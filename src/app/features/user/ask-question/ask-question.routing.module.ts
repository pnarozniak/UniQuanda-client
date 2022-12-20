import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question.component';
import { LimitExceededComponent } from './pages/limit-exceeded/limit-exceeded.component';

const routes: Routes = [
	{
		path: '',
		component: AskQuestionComponent,
		data: { title: 'Zadaj pytanie' },
	},
	{
		path: 'limit-exceeded',
		component: LimitExceededComponent,
		data: { title: 'Limit zadawania pytań przekroczony' },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class AskQuestionRoutingModule {}

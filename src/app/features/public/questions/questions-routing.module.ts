import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: ':idQuestion',
		loadChildren: () =>
			import('./pages/question-details/question-details.module').then(
				(q) => q.QuestionDetailsModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class QuestionsRoutingModule {}

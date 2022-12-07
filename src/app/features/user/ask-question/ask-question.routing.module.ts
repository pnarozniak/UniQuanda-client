import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskQuestionComponent } from './ask-question.component';

const routes: Routes = [
	{
		path: '',
		component: AskQuestionComponent,
		data: { title: 'Zadaj pytanie' },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class AskQuestionRoutingModule {}

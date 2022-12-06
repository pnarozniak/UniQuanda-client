import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'settings',
		loadChildren: () =>
			import('./user-settings/user-settings.module').then(
				(m) => m.UserSettingsModule
			),
	},
	{
		path: 'ask-question',
		loadChildren: () =>
			import('./ask-question/ask-question.module').then(
				(m) => m.AskQuestionModule
			),
		canActivate: [AuthGuardService],
		data: {
			expectedRole: 'user',
		},
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthGuardService from 'src/app/core/guards/auth-guard.service';

const routes: Routes = [
	{
		path: 'settings',
		loadChildren: () =>
			import('./user-settings/user-settings.module').then(
				(m) => m.UserSettingsModule
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

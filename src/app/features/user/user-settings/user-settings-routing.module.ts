import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './user-settings.component';
import AuthGuardService from 'src/app/core/guards/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		component: UserSettingsComponent,
		children: [
			{
				path: 'profile',
				loadChildren: () =>
					import('./pages/profile-settings/profile-settings.module').then(
						(m) => m.ProfileSettingsModule
					),
			},
			{
				path: 'security',
				loadChildren: () =>
					import('./pages/security-settings/security-settings.module').then(
						(m) => m.SecuritySettingsModule
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class UserSettingsRoutingModule {}

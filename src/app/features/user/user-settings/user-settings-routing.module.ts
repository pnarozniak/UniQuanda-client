import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './user-settings.component';

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
			{
				path: 'premium',
				loadChildren: () =>
					import('./pages/premium-settings/premium-settings.module').then(
						(m) => m.PremiumSettingsModule
					),
			},
			{
				path: 'academic-title',
				loadChildren: () =>
					import(
						'./pages/academic-title-settings/academic-title-settings.module'
					).then((m) => m.AcademicTitleSettingsModule),
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

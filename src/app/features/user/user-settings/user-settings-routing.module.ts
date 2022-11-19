import { SecuritySettingsComponent } from './pages/security-settings/security-settings.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
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
				component: ProfileSettingsComponent,
				data: { title: 'Edycja profilu' },
			},
			{
				path: 'security',
				component: SecuritySettingsComponent,
				data: { title: 'Bezpieczeństwo' },
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

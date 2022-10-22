import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
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
				component: ProfileSettingsComponent,
				canActivate: [AuthGuardService],
				data: { title: 'Edycja', expectedRole: 'user' },
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

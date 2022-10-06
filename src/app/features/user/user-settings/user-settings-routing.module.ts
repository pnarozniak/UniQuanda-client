import { UserSettingsDataComponent } from './user-settings-data/user-settings-data.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataResolver } from './resolvers/user-data.resolver';
import { UserSettingsComponent } from './user-settings.component';
import AuthGuardService from 'src/app/core/guards/auth-guard.service';

const routes: Routes = [
	{
		path: '',
		component: UserSettingsComponent,
		children: [
			{
				path: 'profile',
				component: UserSettingsDataComponent,
				canActivate: [AuthGuardService],
				data: { title: 'Edycja', expectedRole: 'user' },
				resolve: { appUser: UserDataResolver },
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [UserDataResolver],
})
export class UserSettingsRoutingModule {}

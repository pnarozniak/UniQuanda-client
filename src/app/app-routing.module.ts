import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import AuthGuardService from './core/guards/auth-guard.service';

const routes: Routes = [
	{
		path: 'public',
		loadChildren: () =>
			import('./features/public/public.module').then((m) => m.PublicModule),
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./features/admin/admin.module').then((m) => m.AdminModule),
		canActivate: [AuthGuardService],
		data: {
			expectedRole: 'Administrator',
		},
	},
	{
		path: 'user',
		loadChildren: () =>
			import('./features/user/user.module').then((m) => m.UserModule),
		canActivate: [AuthGuardService],
		data: {
			expectedRole: 'user',
		},
	},
	{
		path: 'premium',
		loadChildren: () =>
			import('./features/premium/premium.module').then((m) => m.PremiumModule),
		canActivate: [AuthGuardService],
		data: {
			expectedRole: 'Premium',
		},
	},
	{ path: '', redirectTo: 'public/home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './core/components/logout/logout.component';
import { Role } from './core/enums/role.enum';
import AuthGuardService from './core/guards/auth-guard.service';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
	{ path: '', redirectTo: 'public/home', pathMatch: 'full' },
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
			expectedRole: Role.ADMIN,
		},
	},
	{
		path: 'user',
		loadChildren: () =>
			import('./features/user/user.module').then((m) => m.UserModule),
		canActivate: [AuthGuardService],
		data: {
			expectedRole: Role.USER,
		},
	},
	{
		path: 'premium',
		loadChildren: () =>
			import('./features/premium/premium.module').then((m) => m.PremiumModule),
		canActivate: [AuthGuardService],
		data: {
			expectedRole: Role.PREMIUM,
		},
	},
	{
		path: 'logout',
		component: LogoutComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
		data: { title: 'Nie znaleziono danej strony' },
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

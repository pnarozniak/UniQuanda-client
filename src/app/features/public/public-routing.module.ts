import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterSecondStepComponent } from './register/pages//register-second-step/register-second-step.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent, data: { title: 'Strona główna' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Zaloguj się' } },
	{
		path: 'register',
		component: RegisterComponent,
		data: { title: 'Zarejestruj się' },
	},
	{
		path: 'register-second-step',
		component: RegisterSecondStepComponent,
		data: { title: 'Rejestracja, opcjonalne dane' },
	},
	{
		path: 'confirm-registration',
		component: ConfirmRegistrationComponent,
		data: { title: 'Potwierdź konto' },
	},
	{
		path: 'profile/:id',
		loadChildren: () =>
			import('./user-profile/user-profile.module').then(
				(m) => m.UserProfileModule
			),
		data: { title: 'Ładowanie profilu...' },
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PublicRoutingModule {}

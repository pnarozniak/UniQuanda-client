import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent, data: { title: 'Strona główna' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Zaloguj się' } },
	{
		path: 'register',
		component: RegisterComponent,
		data: { title: 'Zarejestruj się' },
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PublicRoutingModule {}

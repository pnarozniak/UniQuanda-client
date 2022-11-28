import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OAuthComponent } from './pages/oauth/oauth.component';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	{
		path: 'oauth/:provider',
		component: OAuthComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class LoginRoutingModule {}

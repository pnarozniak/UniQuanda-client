import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ResetPasswordComponent,
		data: { title: 'Ustaw nowe hasło' },
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}

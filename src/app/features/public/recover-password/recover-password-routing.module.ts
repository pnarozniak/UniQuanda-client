import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: RecoverPasswordComponent,
		data: { title: 'Odyskaj hasło' },
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RecoverPasswordRoutingModule {}

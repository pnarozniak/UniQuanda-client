import { ConfirmEmailComponent } from './../../../user/user-settings/pages/confirm-email/confirm-email.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: ConfirmEmailComponent,
		data: { title: 'Ładowanie...' },
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}

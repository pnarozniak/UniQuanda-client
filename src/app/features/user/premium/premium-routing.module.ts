import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'update',
		loadChildren: () =>
			import('./premium-payment-update/premium-payment-update.module').then(
				(m) => m.PremiumPaymentUpdateModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PremiumRoutingModule {}

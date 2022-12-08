import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PremiumPaymentUpdateComponent } from './premium-payment-update.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: PremiumPaymentUpdateComponent,
		data: { title: 'Przetwarzanie...' },
	},
];

@NgModule({
	declarations: [PremiumPaymentUpdateComponent],
	imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
})
export class PremiumPaymentUpdateModule {}

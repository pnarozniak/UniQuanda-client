import { SharedModule } from 'src/app/shared/shared.module';
import { PremiumSettingsComponent } from './premium-settings.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PremiumInfoComponent } from './components/premium-info/premium-info.component';
import { PremiumSettingsApiService } from './services/premium-settings-api.service';
import { SinglePremiumPaymentComponent } from './components/single-premium-payment/single-premium-payment.component';
import { PremiumPaymentsListComponent } from './components/premium-payments-list/premium-payments-list.component';

const routes: Routes = [
	{
		path: '',
		component: PremiumSettingsComponent,
		data: { title: 'Premium' },
	},
];

@NgModule({
	declarations: [
		PremiumSettingsComponent,
		PremiumInfoComponent,
		PremiumPaymentsListComponent,
		SinglePremiumPaymentComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		RouterModule.forChild(routes),
		SharedModule,
	],
	providers: [PremiumSettingsApiService],
})
export class PremiumSettingsModule {}

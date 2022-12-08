import { PremiumPaymentUpdateModule } from './premium-payment-update/premium-payment-update.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PremiumRoutingModule } from './premium-routing.module';
import { PremiumPaymentUpdateApiService } from './premium-payment-update/services/premium-payment-update-api.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, PremiumRoutingModule, PremiumPaymentUpdateModule],
	providers: [PremiumPaymentUpdateApiService],
})
export class PremiumModule {}

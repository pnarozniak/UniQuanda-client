import { Component, Input, OnInit } from '@angular/core';
import { IPremiumPaymentDTO } from '../../models/premium-payments.dto';
import {
	mapPremiumPaymentStatusEnum,
	PremiumPaymentStatusEnum,
} from '../../enums/premium-payment-status.enum';

@Component({
	selector: 'app-single-premium-payment',
	templateUrl: './single-premium-payment.component.html',
	styleUrls: ['./single-premium-payment.component.scss'],
})
export class SinglePremiumPaymentComponent implements OnInit {
	@Input() isMobileView?: boolean;
	@Input() payment?: IPremiumPaymentDTO;
	@Input() isOddRow?: boolean;

	ngOnInit(): void {
		PremiumPaymentStatusEnum;
	}

	getValue(key: PremiumPaymentStatusEnum): string {
		return mapPremiumPaymentStatusEnum.get(key)!;
	}

	isPaymentStatusNew(key: PremiumPaymentStatusEnum): boolean {
		return key === PremiumPaymentStatusEnum.New;
	}

	isPaymentStatusCanceled(key: PremiumPaymentStatusEnum): boolean {
		return key === PremiumPaymentStatusEnum.Canceled;
	}
}

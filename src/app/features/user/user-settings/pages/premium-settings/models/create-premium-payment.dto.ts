import { CreatePremiumPaymentResultEnum } from '../enums/create-premium-payment-result.enum';

export interface ICreatePremiumPaymentRequestDTO {
	isContinuationPremium: boolean;
}

export interface ICreatePremiumPaymentResponseDTO {
	paymentUrl: string | null;
	status: CreatePremiumPaymentResultEnum;
}

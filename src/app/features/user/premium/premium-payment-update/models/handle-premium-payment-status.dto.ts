import { HandlePremiumPaymentStatusResultEnum } from '../enums/handle-premium-payment-status-result.enum';

export interface IHandlePremiumPaymentStatusResponseDTO {
	status: HandlePremiumPaymentStatusResultEnum;
	accessToken: string | null;
	refreshToken: string | null;
}

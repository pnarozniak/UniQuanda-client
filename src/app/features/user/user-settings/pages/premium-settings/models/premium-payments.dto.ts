import { PremiumPaymentStatusEnum } from '../enums/premium-payment-status.enum';

export interface IPremiumPaymentsResponseDTO {
	nickname: string;
	hasPremiumUntil: Date | null;
	payments: IPremiumPaymentDTO[];
	numberOfPayments: number;
	premiumPrice: number;
}

export interface IPremiumPaymentDTO {
	paymentDate: Date | null;
	idTransaction: string | null;
	price: number;
	paymentStatus: PremiumPaymentStatusEnum;
	paymentUrl: string | null;
}

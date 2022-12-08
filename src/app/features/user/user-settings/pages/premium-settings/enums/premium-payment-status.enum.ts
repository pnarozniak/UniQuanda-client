export enum PremiumPaymentStatusEnum {
	New,
	Pending,
	Canceled,
	Completed,
}

export const mapPremiumPaymentStatusEnum = new Map<number, string>([
	[0, 'Oczekująca'],
	[1, 'W trakcie przetwarzania'],
	[2, 'Nie udało się dokonać płatności'],
	[3, 'Opłacona'],
]);

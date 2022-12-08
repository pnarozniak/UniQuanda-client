import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import ApiService from 'src/app/core/services/api.service';
import {
	ICreatePremiumPaymentRequestDTO,
	ICreatePremiumPaymentResponseDTO,
} from '../models/create-premium-payment.dto';
import { IPremiumPaymentsResponseDTO } from '../models/premium-payments.dto';

@Injectable()
export class PremiumSettingsApiService {
	constructor(private readonly _apiService: ApiService) {}

	public getPremiumPayments(
		getAll: boolean
	): Observable<HttpResponse<IPremiumPaymentsResponseDTO>> {
		const httpParams = new HttpParams().append('getAll', getAll);
		return this._apiService.get(
			'Premium/payments-info',
			httpParams,
			RecaptchaAction.GET_PREMIUM_PAYMENTS
		);
	}

	public createPayment(
		body: ICreatePremiumPaymentRequestDTO
	): Observable<HttpResponse<ICreatePremiumPaymentResponseDTO>> {
		return this._apiService.post<
			ICreatePremiumPaymentResponseDTO,
			ICreatePremiumPaymentRequestDTO
		>('Premium/create-payment', body, RecaptchaAction.CREATE_PREMIUM_PAYMENT);
	}
}

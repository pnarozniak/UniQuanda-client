import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import ApiService from 'src/app/core/services/api.service';
import { IHandlePremiumPaymentStatusResponseDTO } from '../models/handle-premium-payment-status.dto';

@Injectable()
export class PremiumPaymentUpdateApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Send request to handle premium payment status
	 * @returns Observable<HttpResponse<IHandlePremiumPaymentStatusResponseDTO>> object with status code of request
	 * and data of IHandlePremiumPaymentStatusResponseDTO
	 */
	public handlePremiumPayment(): Observable<
		HttpResponse<IHandlePremiumPaymentStatusResponseDTO>
		// eslint-disable-next-line indent
	> {
		return this._apiService.post<IHandlePremiumPaymentStatusResponseDTO, null>(
			'Premium/update-status',
			null,
			RecaptchaAction.HANDLE_PREMIUM_PAYMENT
		);
	}
}

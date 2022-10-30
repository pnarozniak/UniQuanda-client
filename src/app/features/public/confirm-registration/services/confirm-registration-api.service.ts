import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import ApiService from 'src/app/core/services/api.service';
import { ConfirmRegistrationRequestDTO } from '../models/confirm-registration.dto';
import { ResendConfirmationCodeRequestDTO } from '../models/resend-confirmation-code.dto';

@Injectable({
	providedIn: 'root',
})
export class ConfirmRegistrationApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Sends request to api to confirm registration
	 * @param request DTO with email and confirmation code
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	public confirmRegistration(
		request: ConfirmRegistrationRequestDTO
	): Observable<HttpResponse<null>> {
		return this._apiService.post<null, ConfirmRegistrationRequestDTO>(
			'Auth/confirm-register',
			request,
			RecaptchaAction.CONFIRM_REGISTRATION
		);
	}

	/**
	 * Sends request to api to resend confirmation code
	 * @param email email of user
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	public resendRegistrationCode(email: string): Observable<HttpResponse<null>> {
		return this._apiService.post<null, ResendConfirmationCodeRequestDTO>(
			'Auth/resend-register-confirmation-code',
			{ email: email },
			RecaptchaAction.RESEND_REGISTER_CONFIRMATION_CODE
		);
	}
}

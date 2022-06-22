import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ConfirmRegistrationRequestDTO } from './models/confirm-registrationDTO';
import { ResendConfirmationCodeRequestDTO } from './models/resend-confirmation-codeDTO';
@Injectable({
	providedIn: 'root',
})
export class ConfirmRegistrationService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Sends request to api to confirm registration
	 * @param code
	 * @param email
	 * @returns
	 */
	public validateRegistrationCode(
		code: string,
		email: string
	): Observable<HttpResponse<null>> {
		const request = new ConfirmRegistrationRequestDTO(email, code);
		console.log(request);
		return this._apiService.post<null, ConfirmRegistrationRequestDTO>(
			'Auth/confirm-register',
			request
		);
	}

	/**
	 * Sends request to api to resend confirmation code
	 * @param email
	 * @returns
	 */
	public resendRegistrationCode(email: string): Observable<HttpResponse<null>> {
		const request = new ResendConfirmationCodeRequestDTO(email);
		return this._apiService.post<null, ResendConfirmationCodeRequestDTO>(
			'Auth/resend-register-confirmation-code',
			request
		);
	}
}

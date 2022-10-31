import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import ApiService from 'src/app/core/services/api.service';
import { CheckNicknameAndEmailAvailabilityResponseDTO } from '../models/check-nickname-and-email-availability.dto';
import { RegisterRequestDTO } from '../models/register.dto';

@Injectable({
	providedIn: 'root',
})
export class RegisterApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Sends request to api to register new user
	 * @param request DTO with personal data provided by user
	 * @returns registration status
	 */
	public register(request: RegisterRequestDTO): Observable<HttpResponse<null>> {
		return this._apiService.post<null, RegisterRequestDTO>(
			'Auth/register',
			request,
			RecaptchaAction.REGISTER
		);
	}

	/**
	 * Checks agains api if email and nickname are available
	 * @param nickname nickname of user
	 * @param email email of user
	 * @returns Observable<HttpResponse<CheckNicknameAndEmailAvailabilityResponseDTO>> object with status code of request
	 * and information if Nickname and Email provided are unique
	 */
	public isEmailAndNicknameAvailable(
		email: string,
		nickname: string
	): Observable<HttpResponse<CheckNicknameAndEmailAvailabilityResponseDTO>> {
		const params = new HttpParams()
			.set('nickname', nickname)
			.set('email', email);
		return this._apiService.get<CheckNicknameAndEmailAvailabilityResponseDTO>(
			'Auth/is-email-and-nickname-available',
			params,
			RecaptchaAction.IS_EMAIL_AND_NICKNAME_AVAILABLE
		);
	}
}

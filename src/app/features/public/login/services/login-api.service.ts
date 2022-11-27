import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import ApiService from 'src/app/core/services/api.service';
import {
	IConfirmOAuthRegisterRequestDTO,
	IConfirmOAuthRegisterResponseDTO,
} from '../models/confirm-oauth-register.dto';
import { ILoginRequestDTO, ILoginResponseDTO } from '../models/login.dto';
import { IUserInfoResponseDTO } from '../models/user-info.dto';

@Injectable({
	providedIn: 'root',
})
export class LoginApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Performs login api call
	 * @param email user email
	 * @param password user password
	 * @returns Observable<HttpResponse<LoginResponseDTO>> object with status code of request
	 * and data needed for authentication against server in further requests
	 */
	public login(
		email: string,
		password: string
	): Observable<HttpResponse<ILoginResponseDTO>> {
		return this._apiService.post<ILoginResponseDTO, ILoginRequestDTO>(
			'Auth/login',
			{
				email: email,
				password: password,
			},
			RecaptchaAction.LOGIN
		);
	}

	/**
	 * Performs api call in order to confirm oauth register
	 * @param request IConfirmOAuthRegisterRequestDTO
	 * @returns Access token if request is successful
	 */
	public confirmOAuthRegister(
		request: IConfirmOAuthRegisterRequestDTO
	): Observable<string> {
		return this._apiService
			.post<IConfirmOAuthRegisterResponseDTO, IConfirmOAuthRegisterRequestDTO>(
				'Auth/confirm-oauth-register',
				request,
				RecaptchaAction.CONFIRM_OAUTH_REGISTER
			)
			.pipe(map((res) => res.body!.accessToken));
	}

	/**
	 * Performs api call in order to get oauth user info
	 * @param request IConfirmOAuthRegisterRequestDTO
	 * @returns IUserInfoResponseDTO if request is successful
	 */
	public getOAuthUserInfo(): Observable<IUserInfoResponseDTO> {
		return this._apiService
			.get<IUserInfoResponseDTO>(
				'Auth/user-info',
				undefined,
				RecaptchaAction.GET_OAUTH_USER_INFO
			)
			.pipe(map((res) => res.body as IUserInfoResponseDTO));
	}

	/**
	 * Performs api call in order to check whether nickname is available
	 * @param nickname Nickname to be checked
	 * @returns True if nickname is available, otherwise false
	 */
	public isNicknameAvailable(nickname: string): Observable<boolean> {
		const params = new HttpParams()
			.set('nickname', nickname)
			.set('email', 'sample@gmail.com');

		return this._apiService
			.get<{ isNicknameAvailable: boolean }>(
				'Auth/is-email-and-nickname-available',
				params,
				RecaptchaAction.IS_EMAIL_AND_NICKNAME_AVAILABLE
			)
			.pipe(map((res) => res.body?.isNicknameAvailable ?? false));
	}
}

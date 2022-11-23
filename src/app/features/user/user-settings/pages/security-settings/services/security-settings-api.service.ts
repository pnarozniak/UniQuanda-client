import {
	IUpdateUserMainEmailRequestDTO,
	IUpdateUserMainEmailResponseDTO,
} from './../models/update-user-main-email-request.dto';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import {
	IAddExtraEmailRequestDTO,
	IAddExtraEmailResponseDTO,
} from '../models/add-extra-email-request.dto';
import {
	IDeleteExtraEmailRequestDTO,
	IDeleteExtraEmailResponseDTO,
} from '../models/delete-extra-email-request.dto';
import { IGetUserEmailsReponseDTO } from '../models/get-user-emails-reponse.dto';
import {
	IUpdatePasswordRequestDTO,
	IUpdatePasswordResponseDTO,
} from '../models/update-password-request.dto';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';

@Injectable({
	providedIn: 'any',
})
export class SecuritySettingsApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Send a request to get all emails connected with user
	 * @returns Observable<HttpResponse<IGetUserEmailsReponseDTO>> object with status code of request and all user emails
	 */
	public getUserEmails(): Observable<HttpResponse<IGetUserEmailsReponseDTO>> {
		return this._apiService.get<IGetUserEmailsReponseDTO>(
			'Auth/get-user-emails',
			undefined,
			RecaptchaAction.GET_USER_EMAILS
		);
	}

	/**
	 * Send a request to add new extra email
	 * @param body DTO with new extra email and password
	 * @returns Observable<HttpResponse<IAddExtraEmailResponseDTO>> object with status code of request and status of add
	 */
	public addExtraEmail(
		body: IAddExtraEmailRequestDTO
	): Observable<HttpResponse<IAddExtraEmailResponseDTO>> {
		return this._apiService.post<
			IAddExtraEmailResponseDTO,
			IAddExtraEmailRequestDTO
		>('Auth/add-extra-email', body, RecaptchaAction.ADD_EXTRA_EMAIL);
	}

	/**
	 * Send a request to delete an extra email
	 * @param body DTO with id of extra email and password
	 * @returns Observable<HttpResponse<IDeleteExtraEmailResponseDTO>> object with status code of request and status of delete
	 */
	public deleteExtraEmail(
		body: IDeleteExtraEmailRequestDTO
	): Observable<HttpResponse<IDeleteExtraEmailResponseDTO>> {
		return this._apiService.post<
			IDeleteExtraEmailResponseDTO,
			IDeleteExtraEmailRequestDTO
		>('Auth/delete-extra-email', body, RecaptchaAction.DELETE_EXTRA_EMAIL);
	}

	/**
	 * Send a request to update user password
	 * @param body DTO with new and old password
	 * @returns Observable<HttpResponse<IUpdatePasswordResponseDTO>> object with status code of request and status of update
	 */
	public updateUserPassword(
		body: IUpdatePasswordRequestDTO
	): Observable<HttpResponse<IUpdatePasswordResponseDTO>> {
		return this._apiService.put<
			IUpdatePasswordResponseDTO,
			IUpdatePasswordRequestDTO
		>(
			'Auth/update-user-password',
			body,
			undefined,
			RecaptchaAction.UPDATE_USER_PASSWORD
		);
	}

	/**
	 * Send a request to update main email user
	 * @param body DTO with new main email and password
	 * @returns Observable<HttpResponse<IUpdateUserMainEmailResponseDTO>> object with status code of request and status of update
	 */
	public updateUserMainEmail(
		body: IUpdateUserMainEmailRequestDTO
	): Observable<HttpResponse<IUpdateUserMainEmailResponseDTO>> {
		return this._apiService.put<
			IUpdateUserMainEmailResponseDTO,
			IUpdateUserMainEmailRequestDTO
		>(
			'Auth/update-main-email',
			body,
			undefined,
			RecaptchaAction.UPDATE_USER_MAIN_EMAIL
		);
	}

	/**
	 * Send a request to resend link to activate email
	 * @returns Observable<HttpResponse<any>> object with status code of request and status of resend link
	 */
	public resendConfirmationEmail(): Observable<HttpResponse<any>> {
		return this._apiService.post<any, null>(
			'Auth/resend-confirmation-email',
			null,
			RecaptchaAction.RESEND_CONFIRMATION_EMAIL
		);
	}

	/**
	 * Send a request to cancel email confirmation
	 * @returns Observable<HttpResponse<IDeleteExtraEmailResponseDTO>> object with status code of request and status of cancelation email
	 */
	public cancelConfirmationEmail(): Observable<
		HttpResponse<IDeleteExtraEmailResponseDTO>
		// eslint-disable-next-line indent
	> {
		return this._apiService.delete<IDeleteExtraEmailResponseDTO>(
			'Auth/cancel-email-confirmation',
			undefined,
			RecaptchaAction.CANCEL_CONFIRMATION_EMAIL
		);
	}
}

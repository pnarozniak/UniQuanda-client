import { IUpdateUserMainEmailRequestDTO } from './../models/update-user-main-email-request.dto';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { IAddExtraEmailRequestDTO } from '../models/add-extra-email-request.dto';
import { IAuthConflictResponseDTO } from '../models/auth-conflict-response.dto';
import { IDeleteExtraEmailRequestDTO } from '../models/delete-extra-email-request.dto';
import { IGetUserEmailsReponseDTO } from '../models/get-user-emails-reponse.dto';
import { IUpdatePasswordRequestDTO } from '../models/update-password-request.dto';

@Injectable()
export class SecuritySettingsApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Send a request to get all emails connected with user
	 * @returns Observable<HttpResponse<IGetUserEmailsReponseDTO>> object with status code of request and all user emails
	 */
	public getUserEmails(): Observable<HttpResponse<IGetUserEmailsReponseDTO>> {
		return this._apiService.get<IGetUserEmailsReponseDTO>(
			'Auth/get-user-emails'
		);
	}

	/**
	 * Send a request to add new extra email
	 * @param body DTO with new extra email and password
	 * @returns Observable<HttpResponse<IGetUserEmailsReponseDTO>> object with status code of request and status of add
	 */
	public addExtraEmail(
		body: IAddExtraEmailRequestDTO
	): Observable<HttpResponse<IAuthConflictResponseDTO | null>> {
		return this._apiService.post<
			IAuthConflictResponseDTO | null,
			IAddExtraEmailRequestDTO
		>('Auth/add-extra-email', body);
	}

	/**
	 * Send a request to delete an extra email
	 * @param body DTO with id of extra email and password
	 * @returns Observable<HttpResponse<IGetUserEmailsReponseDTO>> object with status code of request and status of delete
	 */
	public deleteExtraEmail(
		body: IDeleteExtraEmailRequestDTO
	): Observable<IAuthConflictResponseDTO | null> {
		return this._apiService.delete<
			IAuthConflictResponseDTO | null,
			IDeleteExtraEmailRequestDTO
		>('Auth/delete-extra-email', body);
	}

	/**
	 * Send a request to update user password
	 * @param body DTO with new and old password
	 * @returns Observable<HttpResponse<IGetUserEmailsReponseDTO>> object with status code of request and status of update
	 */
	public updateUserPassword(
		body: IUpdatePasswordRequestDTO
	): Observable<HttpResponse<IAuthConflictResponseDTO | null>> {
		return this._apiService.put<
			IAuthConflictResponseDTO | null,
			IUpdatePasswordRequestDTO
		>('Auth/update-user-password', body);
	}

	public updateUserMainEmail(
		body: IUpdateUserMainEmailRequestDTO
	): Observable<HttpResponse<IAuthConflictResponseDTO | null>> {
		return this._apiService.put<
			IAuthConflictResponseDTO | null,
			IUpdateUserMainEmailRequestDTO
		>('Auth/update-main-email', body);
	}
}

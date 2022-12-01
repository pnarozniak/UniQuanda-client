import { IUpdateAppUserProfileResponseDTO } from './../models/update-app-user-profile.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { IUserSettingsDataResponseDTO } from '../models/user-settings-data.dto';

@Injectable()
export class UserProfileSettingsApiService {
	constructor(
		private readonly _apiService: ApiService,
		private readonly _http: HttpClient
	) {}

	/**
	 * Send request to get data for update of user profile settings
	 * @returns Observable<HttpResponse<IUserSettingsDataResponseDTO>> object with status code of request
	 * and information with UserData for edit profile
	 */
	public getUserDataForEditProfileSettings(): Observable<
		HttpResponse<IUserSettingsDataResponseDTO>
		// eslint-disable-next-line indent
	> {
		return this._apiService.get<IUserSettingsDataResponseDTO>(
			'appUserProfile/settings'
		);
	}

	/**
	 * Sends request to update user profile settings
	 * @returns Observable<HttpResponse<IUpdateAppUserProfileResponseDTO>> object with status code of request
	 * and if it is successful return new avatar url
	 */
	public updateUser(
		userSettingsDataFormData: FormData
	): Observable<HttpResponse<IUpdateAppUserProfileResponseDTO>> {
		return this._apiService.put<IUpdateAppUserProfileResponseDTO, FormData>(
			'appUserProfile/settings',
			userSettingsDataFormData
		);
	}

	/**
	 * Sends request to get user avatar or banner blob
	 * @param imageUrl User avatar or banner url
	 * @returns Observable<HttpResponse<IUpdateAppUserProfileResponseDTO>> object with status code of request
	 * and if it is successful return new avatar or banner blob
	 */
	public getImage(imageUrl: string): Observable<HttpResponse<Blob>> {
		return this._http.get(imageUrl, {
			responseType: 'blob',
			observe: 'response',
		});
	}
}

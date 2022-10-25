import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { IUserSettingsDataResponseDTO } from '../models/user-settings-data.dto';

@Injectable()
export class UserProfileSettingsApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Send request to get data for update of user profile settings
	 * @returns Observable<HttpResponse<UserSettingsDataResponseDTO>> object with status code of request
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
	 * @returns Observable<HttpResponse<any>> object with status code of request
	 * and if it is successful return new avatar url
	 */
	public updateUser(
		userSettingsDataFormData: FormData
	): Observable<HttpResponse<any>> {
		return this._apiService.put<any, FormData>(
			'appUserProfile/settings',
			userSettingsDataFormData
		);
	}
}

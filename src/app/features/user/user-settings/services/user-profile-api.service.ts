import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { UserSettingsDataResponseDTO } from '../models/user-settings-data.dto';

@Injectable({
	providedIn: 'root',
})
export class UserProfileApiService {
	constructor(private readonly _apiService: ApiService) {}

	public getUserDataForEditProfileSettings(): Observable<
		HttpResponse<UserSettingsDataResponseDTO>
		> {
		return this._apiService.get<UserSettingsDataResponseDTO>(
			'appUserProfile/settings'
		);
	}

	public updateUser(
		userSettingsDataFormData: FormData
	): Observable<HttpResponse<any>> {
		return this._apiService.put(
			'appUserProfile/settings',
			userSettingsDataFormData
		);
	}
}

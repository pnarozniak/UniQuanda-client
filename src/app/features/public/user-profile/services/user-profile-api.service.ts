import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { IUserProfileResponseDTO } from '../models/user-profile.dto';

@Injectable({
	providedIn: 'root',
})
export class UserProfileApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Gets user profile data from api
	 * @param userId  user profile id to get
	 * @returns Observable<HttpResponse<IUserProfileResponseDTO>> object with data needed for user profile
	 */
	public getProfile(
		userId: number
	): Observable<HttpResponse<IUserProfileResponseDTO>> {
		const params = new HttpParams().set('userId', userId);
		return this._apiService.get<IUserProfileResponseDTO>(
			'Profile/get-profile',
			params
		);
	}
}

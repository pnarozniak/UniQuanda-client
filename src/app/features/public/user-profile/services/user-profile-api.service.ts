import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { UserProfileResponseDTO } from '../models/user-profile.dto';

@Injectable({
	providedIn: 'root',
})
export class UserProfileApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Gets user profile data from api
	 * @param userId  user profile id to get
	 * @returns Observable<HttpResponse<UserProfileResponseDTO>> object data needed for user profile
	 */
	public getProfile(
		userId: number
	): Observable<HttpResponse<UserProfileResponseDTO>> {
		const params = new HttpParams().set('userId', userId);
		return this._apiService.get<UserProfileResponseDTO>(
			'Profile/get-profile',
			params
		);
	}
}

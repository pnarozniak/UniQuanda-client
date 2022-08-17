import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { LoginRequestDTO, LoginResponseDTO } from '../models/login.dto';

@Injectable({
	providedIn: 'root',
})
export class LoginApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Connecting api to perform login
	 * @param request DTO with email and password
	 * @returns Observable<HttpResponse<LoginResponseDTO>> object with status code of request
	 * and data needed for authentication against server in further requests
	 */
	public login(
		request: LoginRequestDTO
	): Observable<HttpResponse<LoginResponseDTO>> {
		return this._apiService.post<LoginResponseDTO, LoginRequestDTO>(
			'Auth/login',
			request
		);
	}
}

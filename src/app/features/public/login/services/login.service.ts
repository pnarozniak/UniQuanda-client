import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { LoginRequestDTO, LoginResponseDTO } from '../models/login.dto';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Connecting api to perform login
	 * @param username username of user
	 * @param password password of user
	 * @returns Observable<HttpResponse<LoginResponseDTO>> object with status code of request
	 * and data needed for authentication against server in further requests
	 */
	public login(
		username: string,
		password: string
	): Observable<HttpResponse<LoginResponseDTO>> {
		const body = new LoginRequestDTO(username, password);
		return this._apiService.post<LoginResponseDTO, LoginRequestDTO>(
			'Auth/login',
			body
		);
	}
}

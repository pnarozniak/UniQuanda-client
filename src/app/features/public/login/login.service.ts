import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { LoginRequestDTO, LoginResponseDTO } from './models/loginDTO';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Connecting api to perform login
	 * @param username
	 * @param password
	 * @returns Login status response
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

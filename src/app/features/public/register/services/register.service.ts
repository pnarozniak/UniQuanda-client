import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { CheckNicknameAndEmailResponseDTO } from '../models/check-nickname-and-emailDTO';
import { RegisterRequestDTO } from '../models/registerDTO';

@Injectable({
	providedIn: 'root',
})
export class RegisterService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Sends request to api to register new user
	 * @param nickname
	 * @param password
	 * @param email
	 * @param firstName
	 * @param lastName
	 * @param birthdate
	 * @param phoneNumber
	 * @param city
	 * @returns registration status
	 */
	public register(
		nickname: string,
		password: string,
		email: string,
		firstName: string | null,
		lastName: string | null,
		birthdate: Date | null,
		phoneNumber: string | null,
		city: string | null
	): Observable<HttpResponse<null>> {
		const body = new RegisterRequestDTO(
			nickname,
			password,
			email,
			firstName,
			lastName,
			birthdate,
			phoneNumber,
			city
		);
		return this._apiService.post<null, RegisterRequestDTO>(
			'Auth/register',
			body
		);
	}

	/**
	 * Checks agains api if nickname and email are available
	 * @param nickname
	 * @param email
	 * @returns avilability status
	 */
	public validateNicknameAndEmail(
		nickname: string,
		email: string
	): Observable<HttpResponse<CheckNicknameAndEmailResponseDTO>> {
		const params = new HttpParams()
			.set('nickname', nickname)
			.set('email', email);
		return this._apiService.get<CheckNicknameAndEmailResponseDTO>(
			'Auth/is-email-and-nickname-available',
			params
		);
	}
}

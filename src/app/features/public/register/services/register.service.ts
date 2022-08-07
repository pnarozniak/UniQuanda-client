import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { CheckNicknameAndEmailAvailabilityResponseDTO } from '../models/check-nickname-and-email-availability.dto';
import { RegisterRequestDTO } from '../models/register.dto';

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
	 * @param nickname nickname of user
	 * @param email email of user
	 * @returns Observable<HttpResponse<CheckNicknameAndEmailAvailabilityResponseDTO>> object with status code of request
	 * and information if Nickname and Email provided are unique
	 */
	public validateNicknameAndEmail(
		nickname: string,
		email: string
	): Observable<HttpResponse<CheckNicknameAndEmailAvailabilityResponseDTO>> {
		const params = new HttpParams()
			.set('nickname', nickname)
			.set('email', email);
		return this._apiService.get<CheckNicknameAndEmailAvailabilityResponseDTO>(
			'Auth/is-email-and-nickname-available',
			params
		);
	}
}

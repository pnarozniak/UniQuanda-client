import { IConfirmEmailRequestDTO } from './../models/confirm-email.dto';
import { Injectable } from '@angular/core';
import ApiService from 'src/app/core/services/api.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';

@Injectable()
export class ConfirmEmailApiService {
	constructor(private readonly _apiService: ApiService) {}

	public confirmEmail(
		body: IConfirmEmailRequestDTO
	): Observable<HttpResponse<any>> {
		return this._apiService.post<any, IConfirmEmailRequestDTO>(
			'Auth/confirm-email',
			body,
			RecaptchaAction.CONFIRM_USER_EMAIL
		);
	}
}

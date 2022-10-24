import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';

@Injectable()
export class RecoverPasswordApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Performs password recovery api call
	 * @param email email address of user that wants to recover password
	 * @returns Observable<HttpResponse<unknown>> object
	 */
	recoverPassword(email: string): Observable<HttpResponse<unknown>> {
		return this._apiService.post('Auth/recover-password', { email: email });
	}
}

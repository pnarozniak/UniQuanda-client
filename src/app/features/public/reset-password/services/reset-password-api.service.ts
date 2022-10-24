import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { IResetPasswordDto } from '../models/reset-password.dto';

@Injectable()
export class ResetPasswordApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Performs password reset api call
	 * @param data request data, instance of IResetPasswordDto
	 * @returns Observable<HttpResponse<unknown>> object
	 */
	resetPassword(data: IResetPasswordDto): Observable<HttpResponse<unknown>> {
		return this._apiService.post('Auth/reset-password', data);
	}
}

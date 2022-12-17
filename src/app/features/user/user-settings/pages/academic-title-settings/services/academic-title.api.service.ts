import { HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { IAcademicTitleOfUser } from '../models/academic-title-of-user.dto';
import { IAcademicTitle } from '../models/academic-title.dto';
import TitleOrder from '../models/title-order.dto';
import { ITitleRequest } from '../models/title-request.dto';

@Injectable({
	providedIn: 'root',
})
export class AcademicTitleApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Gets academic titles of user
	 * @param userId user id
	 * @returns
	 */
	public getAcademicOfUserTitles(
		userId: number
	): Observable<IAcademicTitleOfUser[]> {
		const params = new HttpParams().append('userId', userId);
		return this._apiService
			.get<IAcademicTitleOfUser[]>('AcademicTitle/titles-of-user', params)
			.pipe(map((response) => response.body as IAcademicTitleOfUser[]));
	}

	/**
	 * Gets all academic titles that user can request
	 * @returns
	 */
	public getRequestableAcademicTitles(): Observable<IAcademicTitle[]> {
		return this._apiService
			.get<IAcademicTitle[]>('AcademicTitle/requestable-titles')
			.pipe(map((response) => response.body as IAcademicTitle[]));
	}

	/**
	 * Gets all requests for academic titles of user
	 * @returns
	 */
	public getAcademicTitleRequests(): Observable<ITitleRequest[]> {
		return this._apiService
			.get<ITitleRequest[]>('AcademicTitle/requested-titles-of-user')
			.pipe(map((response) => response.body as ITitleRequest[]));
	}

	/**
	 * Updates order of academic titles of user
	 * @param titles List with new order of titles
	 * @returns is success
	 */
	public setOrderOfTitles(titles: TitleOrder[]): Observable<boolean> {
		return this._apiService
			.put<boolean, TitleOrder[]>('AcademicTitle/titles-order', titles)
			.pipe(
				map((response) => {
					return response.status === HttpStatusCode.Ok;
				})
			);
	}

	/**
	 * Adds request for academic title
	 * @param requestForm Form data with request
	 * @returns true if request is added
	 */
	public addRequestForTitle(requestForm: FormData): Observable<boolean> {
		return this._apiService
			.post<boolean, FormData>('AcademicTitle/add-request', requestForm)
			.pipe(
				map((response) => {
					return response.status === HttpStatusCode.Ok;
				})
			);
	}
}

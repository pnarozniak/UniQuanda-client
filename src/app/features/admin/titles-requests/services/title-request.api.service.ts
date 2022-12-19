import { HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ChangeRequestStausRequestDTO } from '../models/change-request-status.dto';
import {
	GetTitleRequestDTO,
	ITitleRequestResponseDTO,
} from '../models/title-request.dto';

@Injectable({
	providedIn: 'root',
})
export class TitleRequestApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Gets pending requests from backend using paging
	 * @param requestData
	 * @returns
	 */
	getRequests(
		requestData: GetTitleRequestDTO
	): Observable<ITitleRequestResponseDTO> {
		const params = new HttpParams()
			.append('page', requestData.page)
			.append('pageSize', requestData.pageSize)
			.append('addCount', requestData.addCount);
		return this._apiService
			.get<ITitleRequestResponseDTO>(
				'AcademicTitle/pending-requested-titles',
				params
			)
			.pipe(map((response) => response.body as ITitleRequestResponseDTO));
	}

	/**
	 * Sets status to request. If status is accepted, then title is added to user
	 * @param requestData
	 * @returns
	 */
	setStatusToRequest(
		requestData: ChangeRequestStausRequestDTO
	): Observable<boolean> {
		return this._apiService
			.post<null, ChangeRequestStausRequestDTO>(
				'AcademicTitle/change-request-status',
				requestData
			)
			.pipe(map((response) => response.status === HttpStatusCode.Ok));
	}
}

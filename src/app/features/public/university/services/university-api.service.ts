import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import {
	GetQuestionsRequestDto,
	IGetQuestionsResponseDto,
} from '../models/get-questions.dto';
import { IGetUniversityReponseDto } from '../models/get-university.dto';

@Injectable({
	providedIn: 'root',
})
export class UniversityApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Gets questions from api
	 * @param request request data
	 * @returns questions and total count if addCount is true
	 */
	getQuestions(
		request: GetQuestionsRequestDto
	): Observable<IGetQuestionsResponseDto> {
		const params = new HttpParams()
			.append('universityId', request.universityId)
			.append('page', request.page)
			.append('pageSize', request.pageSize)
			.append('addCount', request.addCount);

		return this._apiService
			.get<IGetQuestionsResponseDto>('University/questions', params)
			.pipe(
				map(
					(response: HttpResponse<IGetQuestionsResponseDto>) =>
						response.body as IGetQuestionsResponseDto
				)
			);
	}

	/**
	 * Gets university from api
	 * @param universityId university id
	 */
	getUniversity(universityId: number): Observable<IGetUniversityReponseDto> {
		return this._apiService
			.get<IGetUniversityReponseDto>(`University/${universityId}`)
			.pipe(
				map(
					(response: HttpResponse<IGetUniversityReponseDto>) =>
						response.body as IGetUniversityReponseDto
				)
			);
	}
}

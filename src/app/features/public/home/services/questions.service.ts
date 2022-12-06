import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import {
	GetQuestionsRequestDto,
	IGetQuestionsResponseDto,
} from '../models/get-questions.dto';

@Injectable({
	providedIn: 'root',
})
export class QuestionsSerive {
	constructor(private readonly _apiService: ApiService) {}

	getQuestions(
		request: GetQuestionsRequestDto
	): Observable<IGetQuestionsResponseDto> {
		const params = new HttpParams()
			.append('page', request.page)
			.append('pageSize', request.pageSize)
			.append('sortBy', request.sortBy)
			.append('orderDirection', request.orderBy)
			.append('addCount', request.addCount)
			.append('tags', request.tags.join(','));

		return this._apiService
			.get<IGetQuestionsResponseDto>('Questions', params)
			.pipe(
				map(
					(response: HttpResponse<IGetQuestionsResponseDto>) =>
						response.body as IGetQuestionsResponseDto
				)
			);
	}
}

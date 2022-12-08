import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
		let params = new HttpParams()
			.append('page', request.page)
			.append('pageSize', request.pageSize)
			.append('sortBy', request.sortBy)
			.append('orderDirection', request.orderBy)
			.append('addCount', request.addCount);
		if (request.tags.length > 0) {
			request.tags.forEach((tag) => {
				params = params.append('tags', tag);
			});
		}

		return this._apiService
			.get<IGetQuestionsResponseDto>('Question', params)
			.pipe(
				map(
					(response: HttpResponse<IGetQuestionsResponseDto>) =>
						response.body as IGetQuestionsResponseDto
				)
			);
	}
}

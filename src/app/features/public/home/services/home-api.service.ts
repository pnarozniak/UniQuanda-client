import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ITag } from 'src/app/shared/models/tag.model';
import {
	IGetQuestionsRequestDto,
	IGetQuestionsResponseDto,
} from '../models/get-questions.dto';

@Injectable({
	providedIn: 'root',
})
export class HomeApiService {
	constructor(private readonly _apiService: ApiService) {}

	getQuestions(
		request: IGetQuestionsRequestDto
	): Observable<IGetQuestionsResponseDto> {
		let params = new HttpParams()
			.append('page', request.page)
			.append('pageSize', request.pageSize)
			.append('sortBy', request.sortBy)
			.append('orderDirection', request.orderBy)
			.append('addCount', request.addCount)
			.append('searchText', request.searchText);
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

	getTagNames(tagIds: number[]): Observable<ITag[]> {
		let params = new HttpParams();
		tagIds.forEach((tag) => {
			params = params.append('ids', tag);
		});

		return this._apiService
			.get<ITag[]>('Tags/names-by-ids', params)
			.pipe(map((response: HttpResponse<ITag[]>) => response.body as ITag[]));
	}
}

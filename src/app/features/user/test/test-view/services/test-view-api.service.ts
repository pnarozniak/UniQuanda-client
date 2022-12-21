import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ITag } from 'src/app/shared/models/tag.model';
import { IGetAllCommentsResponseDTO } from '../models/get-all-comments.dto';
import { IGetTestResponseDTO } from '../models/get-test.dto';
import { ITestAnswer } from '../models/test-answer.model';

@Injectable({
	providedIn: 'root',
})
export class TestViewApiService {
	constructor(private readonly _api: ApiService) {}

	/**
	 * Gets test by id
	 * @param testId Test id
	 * @returns Test data
	 */
	getTest$(testId: number): Observable<IGetTestResponseDTO> {
		return this._api
			.get<IGetTestResponseDTO>(`test/${testId}`)
			.pipe(map((res) => res.body!));
	}

	/**
	 * Marks test as finished
	 * @param testId Test id
	 */
	markTestAsFinished$(testId: number): Observable<unknown> {
		return this._api.put(`test/${testId}/finish`, {});
	}

	/**
	 * Gets all comments for given answer
	 * @param answerId id of answer which comments should be retrived
	 * @returns List of comments
	 */
	getAllComments$(answerId: number): Observable<ITestAnswer[]> {
		return this._api
			.get<IGetAllCommentsResponseDTO>(`answers/comments/${answerId}`)
			.pipe(
				map((res) =>
					res.body!.comments.map((a) => ({
						id: a.id,
						html: a.content,
						createdAt: a.publishDate.toString(),
						commentsCount: 0,
					}))
				)
			);
	}
}

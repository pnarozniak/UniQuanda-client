import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ITag } from 'src/app/shared/models/tag.model';
import { IAutomaticTestAnswer } from '../models/automatic-test-answer.model';
import { IGetAllCommentsResponseDTO } from '../models/get-all-comments.dto';
import { IGetAutomaticTestResponseDTO } from '../models/get-automatic-test.dto';

@Injectable({
	providedIn: 'root',
})
export class AutomaticTestApiService {
	constructor(private readonly _api: ApiService) {}

	/**
	 * Gets automatic test from api based on given tags
	 * @param tagIds tags ids from which test should be generated
	 * @returns Automatic test data
	 */
	getAutomaticTest$(
		tagIds: number[]
	): Observable<IGetAutomaticTestResponseDTO> {
		let params = new HttpParams();
		tagIds.forEach((id) => {
			params = params.append('tagIds', id);
		});

		return this._api
			.get<IGetAutomaticTestResponseDTO>('test/automatic', params)
			.pipe(map((res) => res.body as IGetAutomaticTestResponseDTO));
	}

	/**
	 * Gets all comments for given answer
	 * @param answerId id of answer which comments should be retrived
	 * @returns List of comments
	 */
	getAllComments$(answerId: number): Observable<IAutomaticTestAnswer[]> {
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

	/**
	 * Gets tags by ids
	 * @param tagIds Tag ids to get names for
	 * @returns List of tags with names and id
	 */
	getTags$(tagIds: number[]): Observable<ITag[]> {
		let params = new HttpParams();
		tagIds.forEach((id) => {
			params = params.append('ids', id);
		});

		return this._api
			.get<ITag[]>('Tags/names-by-ids', params)
			.pipe(map((res) => res.body as ITag[]));
	}
}

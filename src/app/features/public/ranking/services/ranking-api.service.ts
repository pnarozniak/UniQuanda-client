import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ITag } from 'src/app/shared/models/tag.model';
import {
	GetRankingRequestDTO,
	IGetRankingResponseDTO,
} from '../models/get-ranking.model';

@Injectable({
	providedIn: 'root',
})
export class RankingApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Gets given page of ranking
	 * @param request data needed for api call. If tagId is null, global ranking is returned
	 * @returns Observable<IGetRankingResponseDTO> object with data needed for ranking
	 */
	public getRanking(
		request: GetRankingRequestDTO
	): Observable<IGetRankingResponseDTO> {
		let params = new HttpParams();
		params = params.append('page', request.page);
		params = params.append('addPagesCount', request.addCount);
		if (request.tagId) {
			params = params.append('tagId', request.tagId.toString());
		}
		return this._apiService
			.get<IGetRankingResponseDTO>('Ranking/page', params)
			.pipe(
				map((response) => {
					return response.body as IGetRankingResponseDTO;
				})
			);
	}

	/**
	 * Gets tag names by ids
	 * @param tagIds Tag ids to get names for
	 * @returns List of tags with names and id
	 */
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

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import {
	GetRankingRequestDTO,
	IGetRankingResponseDTO,
} from '../models/get-ranking.model';

@Injectable({
	providedIn: 'root',
})
export class GetRankingApiService {
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
}

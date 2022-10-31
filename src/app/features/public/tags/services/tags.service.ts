import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import GetTagsRequestDto, { IGetTagsResponseDto } from '../models/get-tags.dto';

@Injectable({
	providedIn: 'root',
})
export class TagsService {
	constructor(
		private readonly _apiService: ApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router
	) {}

	/**
	 * Gets tags from api
	 * @param requestData data to send to api
	 * @returns List of tags if parentTagId is not provided,
	 * list of subtags if parentTagId is provided.
	 * If keyword is provided, list of tags that match keyword.
	 */
	public getTags(
		requestData: GetTagsRequestDto
	): Observable<IGetTagsResponseDto> {
		let httpParams = new HttpParams()
			.append('page', requestData.page)
			.append('pageSize', requestData.pageSize)
			.append('addCount', requestData.addCount)
			.append('order', requestData.orderDirection);
		if (requestData.parentTagId) {
			httpParams = httpParams
				.append('idTag', requestData.parentTagId)
				.append('addParentTagData', requestData.addParentTagData ?? false);
		}
		if (requestData.keyword) {
			httpParams = httpParams.append('keyword', requestData.keyword);
		}
		return this._apiService.get<IGetTagsResponseDto>('Tags', httpParams).pipe(
			map(
				(response: HttpResponse<IGetTagsResponseDto>) =>
					response.body as IGetTagsResponseDto
			),
			catchError(() => {
				this._toastrService.error('Nie udało się pobrać tagów', 'Błąd');
				this._router.navigate(['/pageNotFound']);
				return of();
			})
		);
	}
}

import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';
import { GetTagsRequestDto, IGetTagsResponseDto } from '../models/get-tags.dto';

@Injectable({
	providedIn: 'root',
})
export class TagsApiService {
	constructor(
		private readonly _apiService: ApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router
	) {}

	/**
	 * Gets tags from api and maps them to ask-question ITag[]
	 * @param requestData data to send to api
	 * @returns List of tags if parentTagId is not provided,
	 * list of subtags if parentTagId is provided.
	 * If keyword is provided, list of tags that match keyword.
	 */
	public getTags(
		requestData: GetTagsRequestDto
	): Observable<IGetTagsResponseDto> {
		const httpParams = new HttpParams()
			.append('page', 1)
			.append('pageSize', 10)
			.append('addCount', false)
			.append('orderDirection', OrderDirection.Ascending)
			.append('keyword', requestData.keyword);
		return this._apiService.get<IGetTagsResponseDto>('Tags', httpParams).pipe(
			map(
				(response: HttpResponse<IGetTagsResponseDto>) =>
					response.body as IGetTagsResponseDto
			),
			catchError(() => {
				this._toastrService.error('Chwilowo nie można zadać pytania', 'Błąd');
				this._router.navigate(['/public/home']);
				return of();
			})
		);
	}
}

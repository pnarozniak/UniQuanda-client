import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ITag } from 'src/app/shared/models/tag.model';

@Injectable({
	providedIn: 'root',
})
export class TagNamesSerive {
	constructor(private readonly _apiService: ApiService) {}

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

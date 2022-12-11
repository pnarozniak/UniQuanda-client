import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ISearchResponseDTO } from 'src/app/core/models/search.dto';
import ApiService from 'src/app/core/services/api.service';

@Injectable({
	providedIn: 'root',
})
export class HeaderApiService {
	constructor(private readonly _apiService: ApiService) {}

	search$(searchText: string): Observable<ISearchResponseDTO> {
		const params = new HttpParams().append('searchText', searchText);
		return this._apiService
			.get<ISearchResponseDTO>('search', params)
			.pipe(map((res) => res.body!));
	}
}

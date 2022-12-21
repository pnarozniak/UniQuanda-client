import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import {
	IGenerateTestRequestDTO,
	IGenerateTestResponseDTO,
} from '../models/generate-test.dto';
import { IGetUserTestsResponseDTO } from '../models/get-user-tests.dto';

@Injectable({
	providedIn: 'root',
})
export class TestsDashboardApiService {
	constructor(private readonly _api: ApiService) {}

	/**
	 * Performs api call in order to generate test from given tags
	 * @param tagIds tags ids from which test should be generated
	 * @returns Id of generated test
	 */
	generateTest$(tagIds: number[]): Observable<number> {
		const body = { tagIds: tagIds };

		return this._api
			.post<IGenerateTestResponseDTO, IGenerateTestRequestDTO>('test', body)
			.pipe(map((res) => res.body!.idTest));
	}

	/**
	 * Gets user tests
	 * @returns User tests
	 */
	getUserTests$(): Observable<IGetUserTestsResponseDTO> {
		return this._api
			.get<IGetUserTestsResponseDTO>('test/user')
			.pipe(map((res) => res.body!));
	}
}

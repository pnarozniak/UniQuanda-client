import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { IGetTop5UsersResponseDTO } from '../models/get-top-5-users.dto';
import { IUserInRanking } from '../models/user-in-ranking.model';

@Injectable({
	providedIn: 'root',
})
export class RightMenuApiService {
	constructor(private readonly _api: ApiService) {}

	/**
	 * Gets top 5 users in ranking from api, and sorts descending by points
	 * @returns Observable<IUserInRanking[]> list of top5users
	 */
	getTop5Users$(): Observable<IUserInRanking[]> {
		return this._api
			.get<IGetTop5UsersResponseDTO>('ranking/top-5-users')
			.pipe(map((res) => res.body!.top5Users))
			.pipe(map((top5Users) => top5Users.sort((user) => user.points)));
	}
}

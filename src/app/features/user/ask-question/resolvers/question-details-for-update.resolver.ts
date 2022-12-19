import { LoaderService } from 'src/app/core/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
	Router,
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, map, finalize } from 'rxjs';
import { IGetQuestionDetailsForUpdateResponseDTO } from '../models/get-question-details-for-update.dto';
import AskQuestionApiService from '../services/ask-question-api.service';

@Injectable({
	providedIn: 'root',
})
/* eslint-disable */
export class QuestionDetailsForUpdateResolver
	implements Resolve<IGetQuestionDetailsForUpdateResponseDTO | null>
{
	constructor(
		private readonly _askQuestionApiService: AskQuestionApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		private readonly _loader: LoaderService
	) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<IGetQuestionDetailsForUpdateResponseDTO | null> {
		const queryParam = route.queryParams['idQuestion'];
		if (!queryParam || isNaN(Number(queryParam)) || queryParam.includes('.'))
			return of(null);

		this._loader.show();
		return this._askQuestionApiService
			.getQuestionDetailsForUpdate(Number(queryParam))
			.pipe(
				finalize(() => this._loader.hide()),
				map((res) => {
					if (res.status === 404 || !res.body) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
						return null;
					}
					res.body.id = Number(queryParam);
					return res.body;
				})
			);
	}
}
/* eslint-enable */

import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, Observable, of } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import AddQuestionRequestDTO, {
	IAddQuestionResponseDTO,
} from '../models/add-question.dto';

@Injectable({
	providedIn: 'root',
})
export default class AskQuestionApiService {
	constructor(
		private readonly _apiService: ApiService,
		private readonly _toastrService: ToastrService
	) {}
	addQuestion(requestData: AddQuestionRequestDTO): Observable<number> {
		return this._apiService
			.post<IAddQuestionResponseDTO, AddQuestionRequestDTO>(
				'Question',
				requestData
			)
			.pipe(
				map(
					(response: HttpResponse<IAddQuestionResponseDTO>) =>
						response.body?.questionId ?? 0
				),
				catchError(() => {
					this._toastrService.error('Chwilowo nie można zadać pytania', 'Błąd');
					return of(0);
				})
			);
	}
}

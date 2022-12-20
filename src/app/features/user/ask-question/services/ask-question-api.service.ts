import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { ILimitCheckResponseDTO } from 'src/app/shared/models/limit-check-response.dto';
import AddQuestionRequestDTO from '../models/add-question.dto';

@Injectable({
	providedIn: 'root',
})
export default class AskQuestionApiService {
	constructor(private readonly _apiService: ApiService) {}
	addQuestion(
		requestData: AddQuestionRequestDTO
	): Observable<HttpResponse<number>> {
		return this._apiService.post<number, AddQuestionRequestDTO>(
			'Question',
			requestData
		);
	}

	checkLimits(): Observable<ILimitCheckResponseDTO> {
		return this._apiService
			.get<ILimitCheckResponseDTO>('Limit/question-add')
			.pipe(map((response) => response.body as ILimitCheckResponseDTO));
	}
}

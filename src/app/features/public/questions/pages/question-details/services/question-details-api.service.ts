import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IQuestionDetailsResponseDTO } from '../models/question-details.dto';
import ApiService from 'src/app/core/services/api.service';
import { IDeleteQuestionResponseDTO } from '../models/delete-question.dto';

@Injectable()
export class QuestionDetailsApiService {
	constructor(private readonly _apiService: ApiService) {}

	public getQuestionDetails(
		idQuestion: number
	): Observable<HttpResponse<IQuestionDetailsResponseDTO>> {
		return this._apiService.get(`Question/${idQuestion}`);
	}

	public followQuestion(idQuestion: number): Observable<HttpResponse<null>> {
		return this._apiService.put(`Question/follow/${idQuestion}`, null);
	}

	public deleteQuestion(
		idQuestion: number
	): Observable<HttpResponse<IDeleteQuestionResponseDTO | null>> {
		return this._apiService.delete(`Question/${idQuestion}`);
	}

	public updateViews(idQuestion: number): Observable<HttpResponse<null>> {
		return this._apiService.put(`Question/Views/${idQuestion}`, null);
	}
}

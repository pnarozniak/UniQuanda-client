import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { IQuestionDetailsResponseDTO } from '../models/question-details.dto';
import ApiService from 'src/app/core/services/api.service';
import { IDeleteQuestionResponseDTO } from '../models/delete-question.dto';

@Injectable()
export class QuestionDetailsApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Send request to get question details
	 * @returns Observable<HttpResponse<IQuestionDetailsResponseDTO>> object with status code of request
	 * and data of IQuestionDetailsResponseDTO
	 */
	public getQuestionDetails(
		idQuestion: number
	): Observable<HttpResponse<IQuestionDetailsResponseDTO>> {
		return this._apiService.get(`Question/${idQuestion}`);
	}

	/**
	 * Send request to update follow question info
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	public followQuestion(idQuestion: number): Observable<HttpResponse<null>> {
		return this._apiService.put(`Question/follow/${idQuestion}`, null);
	}

	/**
	 * Send request to delete question
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	public deleteQuestion(
		idQuestion: number
	): Observable<HttpResponse<IDeleteQuestionResponseDTO | null>> {
		return this._apiService.delete(`Question/${idQuestion}`);
	}

	/**
	 * Send request to update question views
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	public updateViews(idQuestion: number): Observable<HttpResponse<null>> {
		return this._apiService.put(`Question/Views/${idQuestion}`, null);
	}
}

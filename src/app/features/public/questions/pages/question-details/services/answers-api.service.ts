import {
	IUpdateAnswerLikeValueRequestDTO,
	IUpdateAnswerLikeValueResponseDTO,
} from './../models/update-answer-like-value.dto';
import { IAnswerDetailsResponseDTO } from './../models/answer-details.dto';
import { Observable } from 'rxjs';
import {
	IAddAnswerRequestDTO,
	IAddAnswerResponseDTO,
} from './../models/add-answer.dto';
import { Injectable } from '@angular/core';
import ApiService from 'src/app/core/services/api.service';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { IUpdateAnswerRequestDTO } from '../models/update-answer.dto';
import { IGetAllCommentsResponseDTO } from '../models/get-all-comments.dto';

@Injectable()
export class AnswersApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Send request to add answer
	 * @returns Observable<HttpResponse<IAddAnswerResponseDTO>> object with status code of request
	 * and data of IAddAnswerResponseDTO
	 */
	addAnswer(
		requestData: IAddAnswerRequestDTO
	): Observable<HttpResponse<IAddAnswerResponseDTO>> {
		return this._apiService.post<IAddAnswerResponseDTO, IAddAnswerRequestDTO>(
			'Answers',
			requestData,
			RecaptchaAction.ADD_ANSWER
		);
	}

	/**
	 * Send request to update answer
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	updateAnswer(
		requestData: IUpdateAnswerRequestDTO
	): Observable<HttpResponse<null>> {
		return this._apiService.put<null, IUpdateAnswerRequestDTO>(
			'Answers',
			requestData,
			undefined,
			RecaptchaAction.UPDATE_ANSWER
		);
	}

	/**
	 * Send request to get answers
	 * @returns Observable<HttpResponse<IAnswerDetailsResponseDTO>> object with status code of request
	 * and data of IAnswerDetailsResponseDTO
	 */
	getAnswers(
		idQuestion: number,
		page: number,
		idAnswer: number | null,
		idComment: number | null
	): Observable<HttpResponse<IAnswerDetailsResponseDTO>> {
		let params = new HttpParams().append('page', page);
		if (idComment) params = params.append('idComment', idComment);
		if (idAnswer) params = params.append('idAnswer', idAnswer);
		return this._apiService.get<IAnswerDetailsResponseDTO>(
			`Answers/question/${idQuestion}`,
			params
		);
	}

	/**
	 * Send request to get comments
	 * @returns Observable<HttpResponse<IGetAllCommentsResponseDTO>> object with status code of request
	 * and data of IGetAllCommentsResponseDTO
	 */
	getAllComments(
		idAnswerParent: number
	): Observable<HttpResponse<IGetAllCommentsResponseDTO>> {
		return this._apiService.get<IGetAllCommentsResponseDTO>(
			`Answers/comments/${idAnswerParent}`
		);
	}
	/**
	 * Send request to update answer correctness
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	updateAnswerCorrectness(idAnswer: number): Observable<HttpResponse<null>> {
		return this._apiService.put<null, null>(
			`Answers/correct/${idAnswer}`,
			null
		);
	}

	/**
	 * Send request to update answer like value
	 * @returns Observable<HttpResponse<IUpdateAnswerLikeValueResponseDTO>> object with status code of request
	 * and data of IUpdateAnswerLikeValueResponseDTO
	 */
	updateAnswerLikeValue(
		reqData: IUpdateAnswerLikeValueRequestDTO
	): Observable<HttpResponse<IUpdateAnswerLikeValueResponseDTO>> {
		return this._apiService.put<
			IUpdateAnswerLikeValueResponseDTO,
			IUpdateAnswerLikeValueRequestDTO
		>(
			'Answers/like-value',
			reqData,
			undefined,
			RecaptchaAction.UPDATE_ANSWER_LIKE_VALUE
		);
	}

	/**
	 * Send request to delete answer
	 * @returns Observable<HttpResponse<null>> object with status code of request
	 */
	deleteAnswer(idAnswer: number): Observable<HttpResponse<null>> {
		return this._apiService.delete(`Answers/${idAnswer}`);
	}
}

import {
	IUpdateAnswerLikeValueRequestDTO,
	IUpdateAnswerLikeValueResponseDTO,
} from './../models/update-answer-like-value.dto';
import { IAnswerDetailsResponseDTO } from './../models/answer-details.dto';
import { Observable } from 'rxjs';
import { IAddAnswerRequestDTO } from './../models/add-answer.dto';
import { Injectable } from '@angular/core';
import ApiService from 'src/app/core/services/api.service';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import { HttpResponse } from '@angular/common/http';
import { IUpdateAnswerRequestDTO } from '../models/update-answer.dto';
import { IGetAllCommentsResponseDTO } from '../models/get-all-comments.dto';

@Injectable()
export class AnswersApiService {
	constructor(private readonly _apiService: ApiService) {}

	addAnswer(requestData: IAddAnswerRequestDTO): Observable<HttpResponse<null>> {
		return this._apiService.post<null, IAddAnswerRequestDTO>(
			'Answers',
			requestData,
			RecaptchaAction.ADD_ANSWER
		);
	}

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

	getAnswers(
		idQuestion: number
	): Observable<HttpResponse<IAnswerDetailsResponseDTO>> {
		return this._apiService.get<IAnswerDetailsResponseDTO>(
			`Answers/question/${idQuestion}`
		);
	}

	getAllComments(
		idAnswerParent: number
	): Observable<HttpResponse<IGetAllCommentsResponseDTO>> {
		return this._apiService.get<IGetAllCommentsResponseDTO>(
			`Answers/comments/${idAnswerParent}`
		);
	}

	markAnswerAsCorrect(idAnswer: number): Observable<HttpResponse<null>> {
		return this._apiService.put<null, null>(
			`Answers/correct/${idAnswer}`,
			null
		);
	}

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

	deleteAnswer(idAnswer: number): Observable<HttpResponse<null>> {
		return this._apiService.delete(`Answers/${idAnswer}`);
	}
}
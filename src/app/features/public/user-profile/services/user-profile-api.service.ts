import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import {
	GetAnswersRequestDto,
	IGetAnswersResponseDto,
} from '../models/get-answers.dto';
import {
	GetQuestionsRequestDTO,
	IGetQuestionsResponseDTO,
} from '../models/get-questions.dto';
import { IUserProfileResponseDTO } from '../models/user-profile.dto';

@Injectable({
	providedIn: 'root',
})
export class UserProfileApiService {
	constructor(private readonly _apiService: ApiService) {}

	/**
	 * Gets user profile data from api and sorts titles and universities by order
	 * @param userId  user profile id to get
	 * @returns Observable<IUserProfileResponseDTO> object with data needed for user profile
	 */
	public getProfile(userId: number): Observable<IUserProfileResponseDTO> {
		const params = new HttpParams().set('userId', userId);
		return this._apiService
			.get<IUserProfileResponseDTO>('AppUserProfile/get-profile', params)
			.pipe(
				map((data: HttpResponse<IUserProfileResponseDTO>) => {
					const user = data.body as IUserProfileResponseDTO;
					user.academicTitles.sort((a, b) => a.order - b.order);
					user.universities.sort((a, b) => a.order - b.order);
					user.pointsInTags.sort((a, b) => b.points - a.points);
					return user;
				})
			);
	}

	/**
	 * Gets questions in user profile
	 * @param request request data
	 * @returns Observable<IGetQuestionsResponseDTO> object with data needed for questions in user profile
	 */
	public getQuestions(
		request: GetQuestionsRequestDTO
	): Observable<IGetQuestionsResponseDTO> {
		const params = new HttpParams()
			.append('page', request.page)
			.append('pageSize', request.pageSize)
			.append('userId', request.userId)
			.append('addCount', request.addCount);

		return this._apiService
			.get<IGetQuestionsResponseDTO>('AppUserProfile/questions', params)
			.pipe(map((response) => response.body as IGetQuestionsResponseDTO));
	}

	/**
	 * Gets questions in user profile
	 * @param request request data
	 * @returns Observable<IGetQuestionsResponseDTO> object with data needed for questions in user profile
	 */
	public getAnswers(
		request: GetAnswersRequestDto
	): Observable<IGetAnswersResponseDto> {
		const params = new HttpParams()
			.append('page', request.page)
			.append('pageSize', request.pageSize)
			.append('userId', request.userId)
			.append('addCount', request.addCount);

		return this._apiService
			.get<IGetAnswersResponseDto>('AppUserProfile/answers', params)
			.pipe(map((response) => response.body as IGetAnswersResponseDto));
	}
}

import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	catchError,
	filter,
	finalize,
	map,
	Observable,
	switchMap,
	take,
	tap,
	throwError,
} from 'rxjs';
import { IRefreshTokenDTO } from '../models/refresh-token.dto';
import ApiService from './api.service';
import { UserDataService } from './user-data.service';

@Injectable()
export class RefreshTokenService {
	private isRefreshing = false;
	private pendingRefresh$ = new BehaviorSubject<IRefreshTokenDTO | null>(null);

	constructor(
		private readonly _userDataService: UserDataService,
		private readonly _apiService: ApiService
	) {}

	/**
	 * Executes a call to api to generate new access and refresh tokens for logged user
	 * @param prevReq Request that requires a token refresh
	 * @param prevErr Error of request requiring token refresh
	 * @param prevNext Next element of request chain
	 * @returns Observable<HttpEvent<unknown>> On success, returns clone of previous request
	 * with the new access-token attached. If fails, throws an error with previus error
	 */
	refresh(
		prevReq: HttpRequest<unknown>,
		prevErr: HttpErrorResponse,
		prevNext: HttpHandler
	): Observable<HttpEvent<unknown>> {
		if (this.isRefreshing) {
			return this.pendingRefresh$.pipe(
				filter((tokens) => tokens !== null),
				take(1),
				switchMap((tokens) =>
					prevNext.handle(this.cloneRequest(prevReq, tokens!.accessToken))
				)
			);
		}

		const userData = this._userDataService.getUserData();
		if (!userData) {
			return throwError(() => prevErr);
		}

		this.isRefreshing = true;
		return this.refreshTokenApiCall(
			userData.accessToken,
			userData.refreshToken
		).pipe(
			finalize(() => (this.isRefreshing = false)),
			tap((tokens) => {
				this.pendingRefresh$.next(tokens);
				this._userDataService.updateUserData(tokens);
			}),
			switchMap((tokens) =>
				prevNext.handle(this.cloneRequest(prevReq, tokens.accessToken))
			),
			catchError(() => {
				this._userDataService.clearUserData();
				return throwError(() => prevErr);
			})
		);
	}

	private cloneRequest(req: HttpRequest<unknown>, accessToken: string) {
		return req.clone({
			headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
		});
	}

	private refreshTokenApiCall(
		accessToken: string,
		refreshToken: string
	): Observable<IRefreshTokenDTO> {
		return this._apiService
			.post<IRefreshTokenDTO, IRefreshTokenDTO>('/auth/refresh-token', {
				refreshToken: refreshToken,
				accessToken: accessToken,
			})
			.pipe(map((response) => response.body as IRefreshTokenDTO));
	}
}

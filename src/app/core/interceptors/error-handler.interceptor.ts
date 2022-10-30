import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import {
	catchError,
	filter,
	finalize,
	Observable,
	switchMap,
	take,
	tap,
	throwError,
} from 'rxjs';
import { HandleErrorService } from '../services/handle-error.service';
import { UserDataService } from '../services/user-data.service';
import { RefreshTokenService } from '../services/refresh-token.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
	isRefreshing = false;

	constructor(
		private readonly _handleErrorService: HandleErrorService,
		private readonly _userDataService: UserDataService,
		private readonly _refreshTokenService: RefreshTokenService
	) {}

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(req).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status === 401) {
					return this._refreshTokenService.refresh(req, err, next).pipe(
						catchError(() => {
							this._handleErrorService.handleError(err);
							return throwError(() => err);
						})
					);
				}

				this._handleErrorService.handleError(err);
				return throwError(() => err);
			})
		);
	}
}

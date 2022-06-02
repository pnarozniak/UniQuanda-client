import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HandleErrorService } from '../services/handle-error.service';

@Injectable()
export class HandleErrorInterceptorService implements HttpInterceptor {
	constructor(private readonly _handleErrorService: HandleErrorService) {}

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.error instanceof ErrorEvent) {
					this._handleErrorService.handleClientSideError(error.error);
				} else {
					this._handleErrorService.handleServerSideError(error);
				}
				return throwError(() => error);
			})
		);
	}
}

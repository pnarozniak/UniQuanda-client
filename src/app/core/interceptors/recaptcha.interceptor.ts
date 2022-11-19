import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpContextToken,
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaAction } from '../enums/recaptcha-action.enum';

export const recaptchaInterceptorContext =
	new HttpContextToken<RecaptchaAction | null>(() => null);

@Injectable({ providedIn: 'root' })
export class RecaptchaInterceptor implements HttpInterceptor {
	constructor(private readonly _recaptcha: ReCaptchaV3Service) {}

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const recaptchaAction = req.context.get(recaptchaInterceptorContext);
		if (!recaptchaAction) {
			return next.handle(req);
		}

		return this._recaptcha.execute(recaptchaAction).pipe(
			take(1),
			switchMap((recaptchaToken) =>
				next.handle(
					req.clone({
						headers: req.headers.append('recaptcha', recaptchaToken),
					})
				)
			)
		);
	}
}

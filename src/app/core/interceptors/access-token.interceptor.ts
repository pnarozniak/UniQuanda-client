import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/user-data.service';

@Injectable({ providedIn: 'root' })
export class AccessTokenInterceptor implements HttpInterceptor {
	constructor(private userDataService: UserDataService) {}

	intercept(
		req: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		let accessToken = this.userDataService.tempAccessToken;

		if (!accessToken) {
			accessToken = this.userDataService.getUserData()?.accessToken ?? null;
			if (!accessToken) {
				return next.handle(req);
			}
		}

		req = req.clone({
			headers: req.headers.append('authorization', `Bearer ${accessToken}`),
		});
		return next.handle(req);
	}
}

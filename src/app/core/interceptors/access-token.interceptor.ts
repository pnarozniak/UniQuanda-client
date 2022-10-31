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
		const user = this.userDataService.getUserData();
		if (!user) {
			return next.handle(req);
		}

		const token = user.accessToken;
		if (!token) {
			return next.handle(req);
		}

		req = req.clone({
			setHeaders: { authorization: `Bearer ${token}` },
		});
		return next.handle(req);
	}
}

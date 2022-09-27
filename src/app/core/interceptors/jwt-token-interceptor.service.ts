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
export class JwtTokenInterceptor implements HttpInterceptor {
	private readonly _accessTokenKey = 'access_token';

	constructor(private userDataService: UserDataService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = localStorage.getItem(this._accessTokenKey);
		if (!token || !this.userDataService.isUserLoggedIn()) {
			return next.handle(req);
		}

		req = req.clone({
			setHeaders: { authorization: `Bearer ${token}` },
		});
		return next.handle(req);
	}
}

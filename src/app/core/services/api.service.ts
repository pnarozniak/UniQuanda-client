import {
	HttpClient,
	HttpContext,
	HttpParams,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecaptchaAction } from '../enums/recaptcha-action.enum';
import { recaptchaInterceptorContext } from '../interceptors/recaptcha.interceptor';

@Injectable({
	providedIn: 'root',
})
export default class ApiService {
	private server = environment.backend;

	constructor(private http: HttpClient) {}

	public get<T>(
		url: string,
		httpParams: HttpParams = new HttpParams(),
		recaptchaAction: RecaptchaAction | null = null
	): Observable<HttpResponse<T>> {
		return this.http.get<T>(`${this.server}/${url}`, {
			params: httpParams,
			observe: 'response',
			context: new HttpContext().set(
				recaptchaInterceptorContext,
				recaptchaAction
			),
		});
	}

	public post<T, B>(
		url: string,
		body: B,
		recaptchaAction: RecaptchaAction | null = null
	): Observable<HttpResponse<T>> {
		return this.http.post<T>(`${this.server}/${url}`, body, {
			observe: 'response',
			context: new HttpContext().set(
				recaptchaInterceptorContext,
				recaptchaAction
			),
		});
	}

	public put<T, B>(
		url: string,
		body: B,
		httpParams: HttpParams = new HttpParams(),
		recaptchaAction: RecaptchaAction | null = null
	): Observable<HttpResponse<T>> {
		return this.http.put<T>(`${this.server}/${url}`, body, {
			params: httpParams,
			observe: 'response',
			context: new HttpContext().set(
				recaptchaInterceptorContext,
				recaptchaAction
			),
		});
	}

	public delete<T>(
		url: string,
		httpParams: HttpParams = new HttpParams(),
		recaptchaAction: RecaptchaAction | null = null
	): Observable<HttpResponse<T>> {
		return this.http.delete<T>(`${this.server}/${url}`, {
			params: httpParams,
			observe: 'response',
			context: new HttpContext().set(
				recaptchaInterceptorContext,
				recaptchaAction
			),
		});
	}
}

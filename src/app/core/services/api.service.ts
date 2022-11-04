import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export default class ApiService {
	private server = environment.backend;

	constructor(private http: HttpClient) {}

	public get<T>(
		url: string,
		httpParams: HttpParams = new HttpParams()
	): Observable<HttpResponse<T>> {
		return this.http.get<T>(`${this.server}/${url}`, {
			params: httpParams,
			observe: 'response',
		});
	}

	public post<T, B>(url: string, body: B): Observable<HttpResponse<T>> {
		return this.http.post<T>(`${this.server}/${url}`, body, {
			observe: 'response',
		});
	}

	public put<T, B>(
		url: string,
		body: B,
		httpParams: HttpParams = new HttpParams()
	): Observable<HttpResponse<T>> {
		return this.http.put<T>(`${this.server}/${url}`, body, {
			params: httpParams,
			observe: 'response',
		});
	}

	public delete<T>(
		url: string,
		httpParams: HttpParams = new HttpParams()
	): Observable<HttpResponse<T>> {
		return this.http.delete<T>(`${this.server}/${url}`, {
			params: httpParams,
			observe: 'response',
		});
	}
}

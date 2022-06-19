import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export default class ApiService {
	private server = 'https://localhost/api';

	constructor(private http: HttpClient) {}

	public get<T>(
		url: string,
		httpParams: HttpParams = new HttpParams()
	): Observable<T> {
		return this.http.get<T>(`${this.server}/${url}`, {
			params: httpParams,
		});
	}

	public post<T, B>(url: string, body: B): Observable<T> {
		return this.http.post<T>(`${this.server}/${url}`, body);
	}

	public put<T, B>(
		url: string,
		body: B,
		httpParams: HttpParams = new HttpParams()
	): Observable<T> {
		return this.http.put<T>(`${this.server}/${url}`, body, {
			params: httpParams,
		});
	}

	public delete<T>(
		url: string,
		httpParams: HttpParams = new HttpParams()
	): Observable<T> {
		return this.http.delete<T>(`${this.server}/${url}`, {
			params: httpParams,
		});
	}
}

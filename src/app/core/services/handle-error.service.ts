import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HandleErrorService {
	constructor(
		private readonly _toastrService: ToastrService,
		private readonly _router: Router
	) {}

	/**
	 * Handles http error
	 * @param err HttpErrorResponse
	 */
	handleError(err: HttpErrorResponse) {
		if (err.error instanceof ErrorEvent) {
			this.handleClientSideError(err.error);
		} else {
			this.handleServerSideError(err);
		}
	}

	private handleClientSideError(err: ErrorEvent) {
		this.displayErrorMessage('Błąd', err.message);
	}

	private handleServerSideError(err: HttpErrorResponse) {
		if (err.status === 401) {
			this.handle401Error();
		} else if (err.status === 403) {
			this.handle403Error();
		} else if (err.status === 500) {
			this.handle500Error();
		} else if (err.status === 429) {
			this.handle429Error();
		}
	}

	private handle401Error(): void {
		this._router.navigate(['/public/login']);
		this.displayErrorMessage(
			'Twoja sesja wygasła',
			'Musisz zalogować się ponownie'
		);
	}

	private handle403Error(): void {
		this.displayErrorMessage('Niewystarczające uprawnienia', '');
	}

	private handle500Error(): void {
		this.displayErrorMessage(
			'Błąd serwera',
			'Przepraszamy, spróbuj ponownie później.'
		);
	}

	private handle429Error() {
		this.displayErrorMessage(
			'Ups, coś poszło nie tak',
			'Przepraszamy, nie mogliśmy zwerfikować czy nie jesteś robotem. Spróbuj ponownie.'
		);
	}

	private displayErrorMessage(title: string, message: string): void {
		this._toastrService.error(message, title);
	}
}

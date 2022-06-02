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

	public handleClientSideError(err: ErrorEvent) {
		this.displayErrorMessage('Błąd', err.message);
	}

	public handleServerSideError(err: HttpErrorResponse) {
		if (err.status === 401) {
			this.handle401Error(err);
		} else if (err.status === 403) {
			this.handle403Error();
		} else if (err.status === 500) {
			this.handle500Error();
		}
	}

	handle401Error(err: HttpErrorResponse): void {
		this._router.navigate(['/login']);
		this.displayErrorMessage('', err.error ?? 'Nieupoważniony dostęp');
	}

	handle403Error(): void {
		this.displayErrorMessage('', 'Niewystarczające uprawnienia');
	}

	handle500Error(): void {
		this.displayErrorMessage('', 'Błąd serwera');
	}

	displayErrorMessage(title: string, message: string): void {
		this._toastrService.error(title, message);
	}
}
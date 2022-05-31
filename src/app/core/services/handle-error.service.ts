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
		this._toastrService.error('Błąd przeglądarski', err.message);
	}

	public handleServerSideError(err: HttpErrorResponse) {
		let errorMesage: string;
		switch (err.status) {
			case 400:
				errorMesage = err.error ?? 'Błędne zapytanie';
				break;
			case 401:
				errorMesage = err.error ?? 'Nieupoważniony dostęp';
				break;
			case 403:
				errorMesage = 'Niewystarczające uprawnienia';
				break;
			case 404:
				errorMesage = err.error ?? 'Nie znaleziono zasobu';
				break;
			case 500:
				errorMesage = 'Błąd serwera';
				break;
			default:
				errorMesage = 'Nieznany błąd';
				break;
		}

		this._toastrService.error('', errorMesage);
		if (err.status === 401) {
			this._router.navigate(['/login']);
		}
	}
}

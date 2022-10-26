import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class CommonToastrService {
	constructor(private readonly _toastrService: ToastrService) {}

	databaseError(): void {
		this._toastrService.error('Błąd przetwarzania danych', 'Błąd');
	}
}

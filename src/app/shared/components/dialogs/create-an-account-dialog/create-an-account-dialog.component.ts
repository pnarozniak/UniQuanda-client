import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create-an-account-dialog',
	templateUrl: './create-an-account-dialog.component.html',
	styleUrls: ['./create-an-account-dialog.component.scss'],
})
export class CreateAnAccountDialogComponent {
	constructor(
		private readonly _dialogRef: MatDialogRef<CreateAnAccountDialogComponent>,
		private readonly _router: Router
	) {}

	login() {
		this._dialogRef.close();
		this._router.navigate(['/public/login'], {
			queryParams: { redirectUrl: this._router.url },
		});
	}
}

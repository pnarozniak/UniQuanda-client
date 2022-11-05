import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-create-an-account-dialog',
	templateUrl: './create-an-account-dialog.component.html',
	styleUrls: ['./create-an-account-dialog.component.scss'],
})
export class CreateAnAccountDialogComponent {
	constructor(
		private readonly _dialogRef: MatDialogRef<CreateAnAccountDialogComponent>
	) {}

	close() {
		this._dialogRef.close();
	}
}

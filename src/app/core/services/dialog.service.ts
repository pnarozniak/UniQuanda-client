import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	private readonly _baseConfig: MatDialogConfig = {
		backdropClass: 'dialog-base-backdrop',
		scrollStrategy: new NoopScrollStrategy(),
	};

	constructor(private readonly _dialog: MatDialog) {}

	/**
	 * Opens dialog
	 * @param component Dialog component to open
	 * @param config Dialog config
	 * @returns MatDialogRef Reference to dialog
	 */
	open<T, D>(component: ComponentType<T>, config: MatDialogConfig<D> = {}) {
		return (
			this._dialog.openDialogs.find((dialog) => dialog instanceof component) ||
			this._dialog.open<T, D>(component, { ...this._baseConfig, ...config })
		);
	}
}

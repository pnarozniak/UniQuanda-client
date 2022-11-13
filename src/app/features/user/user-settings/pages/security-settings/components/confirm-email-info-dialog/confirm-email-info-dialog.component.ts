import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';
import { IConfirmEmailInfoDialog } from '../../models/confirm-email-info-dialog.model';

@Component({
	selector: 'app-confirm-email-info-dialog',
	templateUrl: './confirm-email-info-dialog.component.html',
	styleUrls: ['./confirm-email-info-dialog.component.scss'],
})
export class ConfirmEmailInfoDialogComponent implements OnInit {
	@Input() email = '';

	isDeleteQuestionVisible = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IConfirmEmailInfoDialog,
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		public dialogRef: MatDialogRef<ConfirmEmailInfoDialogComponent>
	) {}

	ngOnInit(): void {
		this.email = this.data.email;
	}

	changeVisibilityOfDeleteQuestion() {
		this.isDeleteQuestionVisible = !this.isDeleteQuestionVisible;
	}

	deleteEmail(): void {
		this._securitySettingsApiService.cancelConfirmationEmail().subscribe({
			next: () => {
				this.dialogRef.close();
				this._toastrService.success('E-mail został usunięty', 'Sukces');
				const currentUrl = this._router.url;
				this._router
					.navigateByUrl('/', { skipLocationChange: true })
					.then(() => this._router.navigate([currentUrl]));
			},
			error: (req) => {
				if (req.status === 409) {
					this._toastrService.error('Wystąpił błąd', 'Błąd');
				}
			},
		});
	}

	resendLink(): void {
		this._securitySettingsApiService.resendConfirmationEmail().subscribe({
			next: () => {
				this._toastrService.success(
					'Link potwierdzający został wysłany',
					'Sukces'
				);
				const currentUrl = this._router.url;
				this._router
					.navigateByUrl('/', { skipLocationChange: true })
					.then(() => this._router.navigate([currentUrl]));
			},
			error: (req) => {
				if (req.status === 409) {
					this._toastrService.error('Wystąpił błąd', 'Błąd');
				}
			},
		});
	}
}

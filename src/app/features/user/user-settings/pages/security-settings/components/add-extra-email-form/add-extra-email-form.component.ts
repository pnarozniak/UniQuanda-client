import { DialogService } from './../../../../../../../core/services/dialog.service';
import { Router } from '@angular/router';
import { ConflictResponseStatus } from './../../enums/conflict-response-status.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { IAddExtraEmailRequestDTO } from '../../models/add-extra-email-request.dto';
import { finalize } from 'rxjs';
import { ConfirmEmailInfoDialogComponent } from '../confirm-email-info-dialog/confirm-email-info-dialog.component';

@Component({
	selector: 'app-add-extra-email-form',
	templateUrl: './add-extra-email-form.component.html',
	styleUrls: [
		'./add-extra-email-form.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class AddExtraEmailFormComponent {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;
	form: FormGroup = new FormGroup({
		email: new FormControl('', [
			Validators.required,
			Validators.pattern('^.+@.+\\..+$'),
			Validators.maxLength(320),
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.minLength(8),
			Validators.maxLength(30),
			Validators.pattern('^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+).*$'),
		]),
	});

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router,
		private readonly _dialogService: DialogService
	) {}

	sendForm(): void {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		const email = this.form.get('email')?.value;
		if (
			this.userEmails?.mainEmail.value === email ||
			(this.userEmails?.extraEmails &&
				this.userEmails?.extraEmails.filter((ue) => ue.value === email).length >
					0)
		) {
			this._toastrService.error(
				'E-mail jest już przypisany do konta',
				'Informacja'
			);
			return;
		}
		this._loader.show();
		const request: IAddExtraEmailRequestDTO = {
			newExtraEmail: email,
			password: this.form.get('password')?.value,
		};

		this._securitySettingsApiService
			.addExtraEmail(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					const currentUrl = this._router.url;
					this._router
						.navigateByUrl('/', { skipLocationChange: true })
						.then(() => this._router.navigate([currentUrl]));
					this._dialogService.open(ConfirmEmailInfoDialogComponent, {
						data: { email: email, isBasicTitle: true },
					});
				},
				error: (req) => {
					if (req.status === 409) {
						this.handleConflictRespone(req.error.status);
					}
				},
			});
	}

	handleConflictRespone(status: ConflictResponseStatus) {
		if (status === ConflictResponseStatus.InvalidPassword) {
			this.form.get('password')?.setErrors({ invalidPassword: true });
		} else if (status === ConflictResponseStatus.DbConflict) {
			this._toastrService.error('Błąd przetwarzania danych', 'Błąd');
		} else if (status === ConflictResponseStatus.OverLimitOfExtraEmails) {
			this._toastrService.error(
				'Konto może posiadać maksymalnie 3 dodatkowe e-maile',
				'Błąd'
			);
		} else if (status === ConflictResponseStatus.UserHasActionToConfirm) {
			this._toastrService.error(
				'Potwierdź najpierw inne akcje związane z twoim kontem',
				'Błąd'
			);
		} else if (status === ConflictResponseStatus.EmailNotAvailable) {
			this.form.get('email')?.setErrors({ emailNotAvailable: true });
		}
	}
}

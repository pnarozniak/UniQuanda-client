import { DialogService } from 'src/app/core/services/dialog.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AppUserSecurityActionResult } from '../../enums/app-user-security-action-result.enum';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { IUpdateUserMainEmailRequestDTO } from '../../models/update-user-main-email-request.dto';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';
import { ConfirmEmailInfoDialogComponent } from '../confirm-email-info-dialog/confirm-email-info-dialog.component';

@Component({
	selector: 'app-update-main-email-form',
	templateUrl: './update-main-email-form.component.html',
	styleUrls: [
		'./update-main-email-form.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class UpdateMainEmailFormComponent implements OnInit {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;

	extraEmails: string[] = [];
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

	ngOnInit(): void {
		if (this.userEmails?.extraEmails)
			this.extraEmails = this.userEmails.extraEmails.map((ue) => {
				return ue.value;
			});
	}

	sendForm() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		const newMainEmail = this.form.get('email')?.value;
		if (newMainEmail === this.userEmails?.mainEmail.value) {
			this.form.get('email')?.setErrors({ identicalEmail: true });
		}

		this._loader.show();
		const idExtraEmail =
			this.userEmails?.extraEmails.find((ue) => ue.value === newMainEmail)
				?.idEmail ?? null;
		const request: IUpdateUserMainEmailRequestDTO = {
			newMainEmail: newMainEmail,
			idExtraEmail: idExtraEmail,
			password: this.form.get('password')?.value,
		};

		this._securitySettingsApiService
			.updateUserMainEmail(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					const currentUrl = this._router.url;
					this._router
						.navigateByUrl('/', { skipLocationChange: true })
						.then(() => this._router.navigate([currentUrl]));
					if (!request.idExtraEmail) {
						this._dialogService.open(ConfirmEmailInfoDialogComponent, {
							data: {
								email: newMainEmail,
								isBasicTitle: true,
							},
						});
					} else {
						this._toastrService.success(
							'Twój główny e-mail został zaktualizoany',
							'Sukces'
						);
					}
				},
				error: (req) => {
					if (req.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					} else if (req.status === 409) {
						if (
							req.error.actionResult ===
							AppUserSecurityActionResult.InvalidPassword
						) {
							this.form.get('password')?.setErrors({ invalidPassword: true });
						} else if (
							req.error.actionResult ===
							AppUserSecurityActionResult.UnSuccessful
						) {
							this._toastrService.error('Błąd przetwarzania danych', 'Błąd');
						} else if (
							req.error.actionResult ===
							AppUserSecurityActionResult.EmailNotAvailable
						) {
							this.form.get('email')?.setErrors({ emailNotAvailable: true });
						}
					}
				},
			});
	}
}

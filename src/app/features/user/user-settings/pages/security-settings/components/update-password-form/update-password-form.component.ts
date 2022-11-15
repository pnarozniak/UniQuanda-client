import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { FormsValidationService } from 'src/app/shared/services/forms-validation.service';
import { ConflictResponseStatus } from '../../enums/conflict-response-status.enum';
import { IUpdatePasswordRequestDTO } from '../../models/update-password-request.dto';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';

@Component({
	selector: 'app-update-password-form',
	templateUrl: './update-password-form.component.html',
	styleUrls: [
		'./update-password-form.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class UpdatePasswordFormComponent {
	@Output() isFormVisibleEvent = new EventEmitter<boolean>();

	form: FormGroup = new FormGroup(
		{
			oldPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30),
				Validators.pattern('^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+).*$'),
			]),
			newPassword: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30),
				Validators.pattern('^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+).*$'),
			]),
			newRepeatedPassword: new FormControl('', [Validators.required]),
		},
		this._formsValidationService.checkIfPasswordsMatch
	);

	constructor(
		private readonly _formsValidationService: FormsValidationService,
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
	) {}

	sendForm() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		const newPassword = this.form.get('newPassword')?.value;
		const oldPassword = this.form.get('oldPassword')?.value;
		if (newPassword === oldPassword) {
			this.form.get('newPassword')?.setErrors({ notUpdatedPassword: true });
			return;
		}

		this._loader.show();
		const request: IUpdatePasswordRequestDTO = {
			newPassword: newPassword,
			oldPassword: oldPassword,
		};

		this._securitySettingsApiService
			.updateUserPassword(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					this._toastrService.success('Hasło zostało zaktualizowane', 'Sukces');
					this.isFormVisibleEvent.emit(false);
				},
				error: (req) => {
					if (req.status === 404) {
						this._toastrService.error('Zasób nie istnieje', 'Błąd');
						const currentUrl = this._router.url;
						this._router
							.navigateByUrl('/', { skipLocationChange: true })
							.then(() => this._router.navigate([currentUrl]));
					} else if (req.status === 409) {
						if (req.error.status === ConflictResponseStatus.InvalidPassword) {
							this.form
								.get('oldPassword')
								?.setErrors({ invalidPassword: true });
						} else if (req.error.status === ConflictResponseStatus.DbConflict) {
							this._toastrService.error('Błąd przetwarzania danych', 'Błąd');
						}
					}
				},
			});
	}
}

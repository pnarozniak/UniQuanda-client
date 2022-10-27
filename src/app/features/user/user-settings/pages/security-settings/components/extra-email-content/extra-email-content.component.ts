import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CommonToastrService } from 'src/app/shared/services/common-toastr.service';
import { ConflictResponseStatus } from '../../enums/conflict-response-status.enum';
import { IDeleteExtraEmailRequestDTO } from '../../models/delete-extra-email-request.dto';
import { IUserEmailValue } from '../../models/get-user-emails-reponse.dto';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';

@Component({
	selector: 'app-extra-email-content',
	templateUrl: './extra-email-content.component.html',
	styleUrls: [
		'./extra-email-content.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class ExtraEmailContentComponent {
	@Input() extraEmail: IUserEmailValue | null = null;

	isDeleteFormVisibility = false;
	passwordForm: FormControl;

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _commonToastrService: CommonToastrService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService
	) {
		this.passwordForm = new FormControl('', [
			Validators.required,
			Validators.minLength(8),
			Validators.maxLength(30),
			Validators.pattern('^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+).*$'),
		]);
	}

	changeVisibilityDeleteForm(): void {
		this.isDeleteFormVisibility = !this.isDeleteFormVisibility;
	}

	sendForm(): void {
		this.passwordForm.markAllAsTouched();
		if (this.passwordForm.invalid) return;

		this._loader.show();
		const request: IDeleteExtraEmailRequestDTO = {
			idExtraEmail: this.extraEmail!.idEmail,
			password: this.passwordForm.value,
		};

		this._securitySettingsApiService
			.deleteExtraEmail(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					window.location.reload();
					this._toastrService.success('E-mail został usunięty', 'Sukces');
				},
				error: (err) => {
					if (err.error.status === ConflictResponseStatus.InvalidPassword) {
						this.passwordForm.setErrors({ invalidPassword: true });
					} else if (err.error.status === ConflictResponseStatus.DbConflict) {
						this._commonToastrService.databaseError();
					}
				},
			});
	}
}

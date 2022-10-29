import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CommonToastrService } from 'src/app/shared/services/common-toastr.service';
import { ConflictResponseStatus } from '../../enums/conflict-response-status.enum';
import { IDeleteExtraEmailRequestDTO } from '../../models/delete-extra-email-request.dto';
import { IUserEmailValue } from '../../models/get-user-emails-reponse.dto';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';

@Component({
	selector: 'app-delete-extra-email-form',
	templateUrl: './delete-extra-email-form.component.html',
	styleUrls: [
		'./delete-extra-email-form.component.scss',
		'./../../styles/security-settings-component-style.scss',
	],
})
export class DeleteExtraEmailFormComponent {
	@Input() extraEmail: IUserEmailValue | null = null;

	isDeleteFormVisibility = false;
	passwordForm: FormControl;

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _commonToastrService: CommonToastrService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
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
					this._toastrService.success(
						'Daodatkowy e-mail został usunięty',
						'Sukces'
					);
					const currentUrl = this._router.url;
					this._router
						.navigateByUrl('/', { skipLocationChange: true })
						.then(() => this._router.navigate([currentUrl]));
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

import { ConflictResponseStatus } from './../../enums/conflict-response-status.enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { IAddExtraEmailRequestDTO } from '../../models/add-extra-email-request.dto';
import { finalize } from 'rxjs';
import { CommonToastrService } from 'src/app/shared/services/common-toastr.service';

@Component({
	selector: 'app-add-extra-email-form',
	templateUrl: './add-extra-email-form.component.html',
	styleUrls: ['./add-extra-email-form.component.scss'],
})
export class AddExtraEmailFormComponent {
	@Input() userEmails: IGetUserEmailsReponseDTO | null = null;
	form: FormGroup;

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _commonToastrService: CommonToastrService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
	) {
		this.form = new FormGroup({
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
	}

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
			this._toastrService.info(
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
					window.location.reload();
					this._toastrService.success(
						'E-mail został pomyślnie przypisany',
						'Sukces'
					);
				},
				error: (err) => {
					this.handleConflictRespone(err.error.status);
				},
			});
	}

	handleConflictRespone(status: ConflictResponseStatus) {
		if (status === ConflictResponseStatus.InvalidPassword) {
			this.form.get('password')?.setErrors({ invalidPassword: true });
		} else if (status === ConflictResponseStatus.DbConflict) {
			this._commonToastrService.databaseError();
		} else if (status === ConflictResponseStatus.OverLimitOfExtraEmails) {
			this._toastrService.error(
				'Konto może posiadać maksymalnie 3 dodatkowe e-maile',
				'Błąd'
			);
		} else if (status === ConflictResponseStatus.EmailNotAvailable) {
			this.form.get('email')?.setErrors({ emailExists: true });
		}
	}
}

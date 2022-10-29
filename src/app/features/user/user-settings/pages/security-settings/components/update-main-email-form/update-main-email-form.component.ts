import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { CommonToastrService } from 'src/app/shared/services/common-toastr.service';
import { ConflictResponseStatus } from '../../enums/conflict-response-status.enum';
import { IGetUserEmailsReponseDTO } from '../../models/get-user-emails-reponse.dto';
import { IUpdateUserMainEmailRequestDTO } from '../../models/update-user-main-email-request.dto';
import { SecuritySettingsApiService } from '../../services/security-settings-api.service';

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

	form: FormGroup;
	extraEmails: string[] = [];

	constructor(
		private readonly _securitySettingsApiService: SecuritySettingsApiService,
		private readonly _commonToastrService: CommonToastrService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService
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
			newMainEmail: idExtraEmail ? null : newMainEmail,
			idExtraEmail: idExtraEmail,
			password: this.form.get('password')?.value,
		};

		this._securitySettingsApiService
			.updateUserMainEmail(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					this._toastrService.success(
						'Główny e-mail został zmieninoy',
						'Sukces'
					);
					window.location.reload();
				},
				error: (err) => {
					if (err.error.status === ConflictResponseStatus.InvalidPassword) {
						this.form.get('password')?.setErrors({ invalidPassword: true });
					} else if (err.error.status === ConflictResponseStatus.DbConflict) {
						this._commonToastrService.databaseError();
					} else if (
						err.error.status === ConflictResponseStatus.EmailNotAvailable
					) {
						this.form.get('email')?.setErrors({ emailNotAvailable: true });
					}
				},
			});
	}
}

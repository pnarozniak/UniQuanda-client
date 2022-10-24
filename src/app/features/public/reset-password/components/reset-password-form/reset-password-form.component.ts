import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { FormsValidationService } from 'src/app/shared/services/forms-validation.service';
import { IResetPasswordDto } from '../../models/reset-password.dto';
import { ResetPasswordApiService } from '../../services/reset-password-api.service';

@Component({
	selector: 'app-reset-password-form',
	templateUrl: './reset-password-form.component.html',
	styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent {
	@Input() email = '';
	@Input() recoveryToken = '';

	form: FormGroup = new FormGroup(
		{
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(30),
				Validators.pattern('^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+).*$'),
			]),
			repeatPassword: new FormControl('', [Validators.required]),
		},
		this._formsValidationService.checkIfPasswordsMatch
	);

	constructor(
		private readonly _formsValidationService: FormsValidationService,
		private readonly _resetPasswordApiService: ResetPasswordApiService,
		private readonly _loader: LoaderService,
		private readonly _router: Router,
		private readonly _toastr: ToastrService
	) {}

	handleResetPassword() {
		if (this.form.invalid) return;

		const data: IResetPasswordDto = {
			email: this.email,
			recoveryToken: this.recoveryToken,
			newPassword: this.form.value.password,
		};

		this._loader.show();
		this._resetPasswordApiService
			.resetPassword(data)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					this._toastr.success(
						'Teraz możesz zalogować się na swoje konto.',
						'Hasło zmienione pomyślnie'
					);
					this._router.navigate(['/public/login']);
				},
				error: (error) => {
					if (error.status === 409) {
						this._toastr.error(
							'Przepraszamy, spróbuj ponownie',
							'Coś poszło nie tak'
						);
						this._router.navigate(['/public/recover-password']);
					}
				},
			});
	}
}

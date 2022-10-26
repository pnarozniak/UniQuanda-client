import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsValidationService } from 'src/app/shared/services/forms-validation.service';
import { RegisterValidationService } from './services/register-validation.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	public form: FormGroup = new FormGroup(
		{
			nickname: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
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
			repeatPassword: new FormControl('', [Validators.required]),
		},
		this._formsValidationService.checkIfPasswordsMatch,
		this._registerValidationService.checkNicknameAndEmailAvailability
	);

	constructor(
		private readonly _router: Router,
		private readonly _registerValidationService: RegisterValidationService,
		private readonly _formsValidationService: FormsValidationService
	) {}

	handleRegister() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._router.navigate(
			[
				'/public/register-second-step',
				{
					nickname: this.form.value.nickname,
					password: this.form.value.password,
					email: this.form.value.email,
				},
			],
			{
				skipLocationChange: true,
			}
		);
	}
}

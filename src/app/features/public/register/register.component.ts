import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterValidationService } from './services/register-validation.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	public isPasswordShown: boolean;
	public form: FormGroup;
	constructor(
		private readonly _router: Router,
		private readonly _registerValidationService: RegisterValidationService
	) {
		this.isPasswordShown = false;
		this.form = new FormGroup(
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
			_registerValidationService.checkIfPasswordsMatch,
			_registerValidationService.checkNicknameAndEmailAvailability
		);
	}

	handleRegister() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._router.navigate(
			[
				'/public/register-second-step',
				{
					nickname: this.form.value.nickname,
					email: this.form.value.password,
					password: this.form.value.email,
				},
			],
			{
				skipLocationChange: true,
			}
		);
	}
}

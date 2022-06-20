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
					Validators.minLength(6),
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
					Validators.pattern('^.*[A-Z]+[a-z]+[0-9]+.*'),
				]),
				repeatPassword: new FormControl('', [Validators.required]),
			},
			_registerValidationService.checkIfPasswordsMatch,
			_registerValidationService.checkIfUsernameAndEmailExistsAsync
		);
	}

	handleRegister() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this._router.navigate(
				[
					'/public/register-data',
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
}
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { LoginApiService } from './services/login-api.service';
import { LoginRequestDTO, LoginResponseStatus } from './models/login.dto';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	public isPasswordShown: boolean;
	public form: FormGroup;
	constructor(
		private readonly _loginApiService: LoginApiService,
		private readonly _userDataService: UserDataService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router
	) {
		this.isPasswordShown = false;
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

	handleLogin() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		const formValue = this.form.value;
		this._loginApiService
			.login(new LoginRequestDTO(formValue.email, formValue.password))
			.subscribe({
				next: (res) => {
					if (res.body?.status === LoginResponseStatus.EmailNotConfirmed) {
						this._toastrService.error(
							'Konto posiada nie potwierdzony adres E-mail. Sprawdź swoją skrzynkę pocztową',
							'Błąd'
						);
						this._router.navigate([
							'/public/confirm-registration',
							{ email: this.form.value.email },
						]);
					} else if (res.body?.status === LoginResponseStatus.Success) {
						this._userDataService.setUserData(
							res.body.nickname ?? '',
							res.body.avatar ?? '',
							res.body.accessToken ?? '',
							res.body.refreshToken ?? ''
						);
						this._router.navigate(['/public/home']);
					}
				},
				error: () => {
					this._toastrService.error(
						'Nie znaleziono użytkownika o podanych danych',
						'Błąd'
					);
				},
			});
	}
}

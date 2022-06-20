import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokensService } from 'src/app/core/services/tokens.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { LoginService } from './login.service';
import { LoginResponseDTO, LoginResponseStatus } from './models/loginDTO';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	public isPasswordShown: boolean;
	public form: FormGroup;
	constructor(
		private readonly _loginService: LoginService,
		private readonly _tokenService: TokensService,
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
				Validators.pattern('^.*[A-Z]+[a-z]+[0-9]+.*'),
			]),
		});
	}

	handleLogin() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			const formValue = this.form.value;
			this._loginService.login(formValue.email, formValue.password).subscribe({
				next: (data: LoginResponseDTO) => {
					if (data.status === LoginResponseStatus.Success) {
						this._tokenService.saveUserData(
							data.accessToken ?? '',
							data.refreshToken ?? '',
							data.nickname ?? '',
							data.avatar ?? ''
						);
						this._userDataService.setUserData(
							this._tokenService.generateClaims()
						);
						this._router.navigate(['/public/login']);
					} else {
						this._toastrService.error(
							'Konto posiada nie potwierdzony adres E-mail. Sprawdź swoją skrzynkę pocztową',
							'Błąd'
						);
						this._router.navigate(['/public/confirm-email']);
					}
				},
				error: (err) => {
					if (err.status === 404) {
						this._toastrService.error(
							'Nie znaleziono użytkownika o podanych danych',
							'Błąd'
						);
					}
				},
			});
		}
		if (
			!this.form.get('email')?.hasError('required') &&
			!this.form.get('email')?.hasError('pattern') &&
			!this.form.get('password')?.hasError('required')
		) {
			this._toastrService.error(
				'Nie znaleziono użytkownika o podanych danych',
				'Błąd'
			);
		}
	}
}

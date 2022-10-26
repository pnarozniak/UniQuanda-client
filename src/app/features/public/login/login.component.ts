import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { LoginApiService } from './services/login-api.service';
import { LoginRequestDTO, LoginResponseStatus } from './models/login.dto';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	public form: FormGroup = new FormGroup({
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

	constructor(
		private readonly _loginApiService: LoginApiService,
		private readonly _userDataService: UserDataService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		private readonly _loader: LoaderService
	) {}

	handleLogin() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._loader.show();
		const formValue = this.form.value;
		this._loginApiService
			.login(new LoginRequestDTO(formValue.email, formValue.password))
			.pipe(finalize(() => this._loader.hide()))
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
				error: (error) => {
					if (error.status === 404) {
						this._toastrService.error(
							'Nie znaleziono użytkownika o podanych danych',
							'Błąd'
						);
					}
				},
			});
	}
}

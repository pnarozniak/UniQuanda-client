import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs';
import { LoginApiService } from '../../services/login-api.service';
import { LoginResponseStatus } from '../../models/login.dto';

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
	private redirectUrl: string | null =
		this._activatedRoute.snapshot.queryParamMap.get('redirectUrl');

	constructor(
		private readonly _loginApiService: LoginApiService,
		private readonly _userDataService: UserDataService,
		private readonly _toastrService: ToastrService,
		private readonly _router: Router,
		private readonly _loader: LoaderService,
		private readonly _activatedRoute: ActivatedRoute
	) {}

	handleLogin() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._loader.show();
		const formValue = this.form.value;
		this._loginApiService
			.login(formValue.email, formValue.password)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: (res) => {
					if (res.body?.status === LoginResponseStatus.EmailNotConfirmed) {
						this._toastrService.error(
							'Konto posiada niepotwierdzony adres E-mail. Sprawdź swoją skrzynkę pocztową',
							'Błąd'
						);
						this._router.navigate(['/public/confirm-registration'], {
							queryParams: { email: this.form.value.email },
						});
						return;
					}
					if (res.body?.status === LoginResponseStatus.Success) {
						this._userDataService.setUserData({
							nickname: res.body.nickname ?? '',
							avatar: res.body.avatar ?? '',
							accessToken: res.body.accessToken ?? '',
							refreshToken: res.body.refreshToken ?? '',
						});
						this._router.navigate([this.redirectUrl || '/public/home']);
						this._toastrService.success(
							'Zostałeś zalogwany',
							`Witamy ${res.body.nickname}`
						);
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

	handleLoginByProvider(provider: 'Google') {
		this._router.navigate([`/public/login/oauth/${provider}`]);
	}
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { FormsValidationService } from 'src/app/shared/services/forms-validation.service';
import { LoginApiService } from '../../services/login-api.service';
import { OAuthFormValidationService } from '../../services/oauth-form-validation.service';
import { OAuthService } from '../../services/oauth.service';

@Component({
	selector: 'app-oauth',
	templateUrl: './oauth.component.html',
	styleUrls: ['./oauth.component.scss'],
})
export class OAuthComponent implements OnInit {
	availableProviders = ['Google'];
	provider = '';
	confirmationCode = '';
	form = new FormGroup(
		{
			nickname: new FormControl('', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
			]),
			firstName: new FormControl('', [Validators.maxLength(35)]),
			lastName: new FormControl('', [Validators.maxLength(51)]),
			birthdate: new FormControl('', [
				this._formsValidationService.checkIfDateBeforeNow,
			]),
			phoneNumber: new FormControl('', [Validators.maxLength(22)]),
			city: new FormControl('', [Validators.maxLength(57)]),
		},
		this._oauthFormValidationService.checkNicknameAvailability
	);

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _oauthService: OAuthService,
		private readonly _loader: LoaderService,
		private readonly _toastr: ToastrService,
		private readonly _userDataService: UserDataService,
		private readonly _loginApiService: LoginApiService,
		private readonly _formsValidationService: FormsValidationService,
		private readonly _oauthFormValidationService: OAuthFormValidationService
	) {}

	ngOnInit(): void {
		const params = this._route.snapshot.paramMap;
		const provider = params.get('provider');
		if (!provider || !this.availableProviders.includes(provider)) {
			this._router.navigate(['page-not-found']);
			return;
		}
		this.provider = provider;
		this._loader.show();

		const queryParams = this._route.snapshot.queryParamMap;
		const error = queryParams.get('error');
		if (error) return this.handleOAuthError(error);

		const accessToken = queryParams.get('accessToken');
		if (accessToken) return this.handleOAuthLoginSuccess(accessToken);

		const confirmationCode = queryParams.get('confirmationCode');
		if (confirmationCode) {
			this.confirmationCode = confirmationCode;
			this._loader.hide();
			return;
		}

		this.initializeOAuthFlow();
	}

	initializeOAuthFlow() {
		if (this.provider === 'Google') {
			return this._oauthService.redirectToGoogleLogin();
		}
	}

	handleOAuthError(error: string) {
		this._router.navigate(['/public/login']);
		const errorMessage =
			error === '409'
				? 'Spróbuj zalogować się korzystajac bezpośrednio z naszego formularza.'
				: 'Coś poszło nie tak. Prosimy spróbować później.';
		this._toastr.error(errorMessage, 'Wystąpił błąd!');
		this._loader.hide();
	}

	handleOAuthLoginSuccess(accessToken: string) {
		this._userDataService.tempAccessToken = accessToken;
		this._loginApiService
			.getOAuthUserInfo()
			.pipe(
				finalize(() => {
					this._userDataService.tempAccessToken = null;
					this._loader.hide();
				})
			)
			.subscribe({
				next: (userInfo) => {
					this._userDataService.setUserData({
						accessToken: accessToken,
						refreshToken: userInfo.refreshToken,
						avatar: userInfo.avatar ?? '',
						nickname: userInfo.nickname,
					});
					this._router.navigate(['/public/home']);
					this._toastr.success(
						'Zostałeś zalogwany',
						`Witamy ${userInfo.nickname}`
					);
				},
				error: () => {
					this._router.navigate(['/public/login']);
					this._toastr.error(
						'Coś poszło nie tak. Prosimy spróbować później.',
						'Wystąpił błąd!'
					);
				},
			});
	}

	handleConfirmOAuthRegister() {
		console.log(this.form.get('nickname')?.pending);
		if (this.form.invalid || this.form.get('nickname')?.pending) return;

		this._loader.show();
		this._loginApiService
			.confirmOAuthRegister({
				confirmationCode: this.confirmationCode!,
				...this.form.value,
			})
			.subscribe({
				next: (accessToken) => {
					this.handleOAuthLoginSuccess(accessToken);
				},
				error: () => {
					this._loader.hide();
					this._toastr.error(
						'Coś poszło nie tak. Prosimy spróbować później.',
						'Wystąpił błąd!'
					);
					this._router.navigate(['/public/login']);
				},
			});
	}
}

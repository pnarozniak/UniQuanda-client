import { AppUserProfileUpdateResult } from './enums/app-user-profile-update-result.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { FormsValidationService } from 'src/app/shared/services/forms-validation.service';
import {
	BehaviorSubject,
	catchError,
	finalize,
	map,
	Observable,
	of,
} from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { HttpResponse } from '@angular/common/http';
import { IUserSettingsDataResponseDTO } from './models/user-settings-data.dto';
import { UserProfileSettingsApiService } from './services/user-profile-settings-api.service';

@Component({
	selector: 'app-profile-settings',
	templateUrl: './profile-settings.component.html',
	styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
	public user$: Observable<IUserSettingsDataResponseDTO | null> =
		new BehaviorSubject<IUserSettingsDataResponseDTO | null>(null);
	public user: IUserSettingsDataResponseDTO | undefined | null;

	public backgroundAvatar = 'common/default_avatar.svg';
	public backgroundBanner = 'common/default_users_background.svg';

	private userAvatar: File | null = null;
	private isNewAvatar = false;
	private userBanner: File | null = null;
	private isNewBanner = false;

	public form: FormGroup = new FormGroup({
		nickName: new FormControl('', [
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
		semanticScholarProfile: new FormControl('', [
			Validators.pattern('^https://www.semanticscholar.org/author/.*/.*$'),
		]),
		aboutText: new FormControl('', [Validators.maxLength(4000)]),
	});

	constructor(
		private readonly _userProfileSettingApiService: UserProfileSettingsApiService,
		private readonly _formsValidationService: FormsValidationService,
		private readonly _userdataService: UserDataService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
	) {}

	ngOnInit(): void {
		this.loadUser();
	}

	loadUser() {
		this.user$ = this._userProfileSettingApiService
			.getUserDataForEditProfileSettings()
			.pipe(
				map((data: HttpResponse<IUserSettingsDataResponseDTO>) => {
					this.user = data.body;
					this.form.patchValue({
						nickName: this.user?.nickName,
						firstName: this.user?.firstName,
						lastName: this.user?.lastName,
						birthdate: this.user?.birthdate,
						phoneNumber: this.user?.phoneNumber,
						city: this.user?.city,
						semanticScholarProfile: this.user?.semanticScholarProfile,
						aboutText: this.user?.aboutText,
					});
					return data.body;
				}),
				catchError((req) => {
					if (req.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					}
					return of();
				})
			);
	}

	handleDateChange(date: Date) {
		if (date?.toString() === 'Invalid Date') {
			this.form.get('birthdate')?.setErrors({ invalidFormat: true });
		}
	}

	updateUser() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		this._loader.show();
		const userFormData: FormData = new FormData();
		const nickNameValue = this.form.get('nickName')?.value;
		if (nickNameValue && nickNameValue !== this.user?.nickName) {
			userFormData.append('NickName', nickNameValue);
		} else {
			userFormData.append('NickName', this.user!.nickName);
		}
		userFormData.append('FirstName', this.form.get('firstName')?.value ?? '');
		userFormData.append('LastName', this.form.get('lastName')?.value ?? '');
		if (this.form.get('birthdate')?.value)
			userFormData.append(
				'Birthdate',
				moment(this.form.get('birthdate')?.value ?? '')
					.utc(true)
					.toISOString()
			);
		userFormData.append(
			'PhoneNumber',
			this.form.get('phoneNumber')?.value ?? ''
		);
		userFormData.append('City', this.form.get('city')?.value ?? '');
		userFormData.append(
			'SemanticScholarProfile',
			this.form.get('semanticScholarProfile')?.value ?? ''
		);
		userFormData.append('AboutText', this.form.get('aboutText')?.value ?? '');
		if (this.userBanner) userFormData.append('Banner', this.userBanner);
		userFormData.append('isNewAvatar', this.isNewAvatar.toString());
		if (this.userAvatar) userFormData.append('Avatar', this.userAvatar);
		userFormData.append('isNewBanner', this.isNewBanner.toString());

		this._userProfileSettingApiService
			.updateUser(userFormData)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: (res) => {
					if (res.status === 200) {
						this._toastrService.success(
							'Sukces',
							'Twoje zmiany zostały zapisane'
						);
						if (this.isNewAvatar) {
							this._userdataService.updateUserData({
								avatar: res.body?.avatarUrl,
							});
						}
						this._router.navigate([
							`/public/profile/${this._userdataService.getUserData()?.id}`,
						]);
					}
				},
				error: (res) => {
					if (res.status === 404) {
						this._toastrService.error('Błąd', 'Zasób nie istnieje');
						this._router.navigate(['/page-not-found']);
					} else if (res.status === 409) {
						if (
							res.error.appUserUpdateStatus ===
							AppUserProfileUpdateResult.NickNameIsUsed
						) {
							this.form.get('nickName')?.setErrors({ nicknameExists: true });
						} else {
							this._toastrService.error('Błąd', 'Błąd aktualizacji danych');
						}
					}
				},
			});
	}

	updateAvatar(file: File | null) {
		this.isNewAvatar = true;
		this.userAvatar = file;
	}

	updateBanner(file: File | null) {
		this.isNewBanner = true;
		this.userBanner = file;
	}
}

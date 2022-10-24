import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
	BehaviorSubject,
	catchError,
	Observable,
	of,
	Subscription,
	tap,
} from 'rxjs';
import { IUserClaims } from 'src/app/core/models/user-claims.model';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { IUserProfileResponseDTO } from './models/user-profile.dto';
import { UserProfileApiService } from './services/user-profile-api.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
	public profile$: Observable<IUserProfileResponseDTO | null>;
	public userClaims$: Observable<IUserClaims | null>;
	public subscription = new Subscription();

	constructor(
		private readonly _userProfileApiService: UserProfileApiService,
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _titleService: Title,
		private readonly _userDataService: UserDataService
	) {
		this.profile$ = new BehaviorSubject<IUserProfileResponseDTO | null>(null);
		this.userClaims$ = this._userDataService.getUserData$();
	}

	ngOnInit(): void {
		this.subscription.add(
			this._route.paramMap.subscribe((params) => {
				const profileId = params.get('id');
				if (profileId) {
					this.profile$ = this._userProfileApiService
						.getProfile(Number(profileId))
						.pipe(
							tap((user: IUserProfileResponseDTO) => {
								this._titleService.setTitle(
									`UniQuanda - Profil użytkownika ${user.userData.nickname}`
								);
							}),
							catchError(() => {
								this._toastrService.error('Nieprawidłowy profil', 'Błąd');
								this._router.navigate(['/pageNotFound']);
								return of();
							})
						);
				} else {
					this._toastrService.error('Nieprawidłowy profil', 'Błąd!');
					this._router.navigate(['/public/home']);
				}
			})
		);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}

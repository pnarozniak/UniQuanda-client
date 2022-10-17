import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { IUserClaims } from 'src/app/core/models/user-claims.model';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { IUserProfileResponseDTO } from './models/user-profile.dto';
import { UserProfileApiService } from './services/user-profile-api.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
	public profile$: Observable<IUserProfileResponseDTO | null>;
	public userClaims$: Observable<IUserClaims | null>;

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
		const profileId = this._route.snapshot.paramMap.get('id');
		if (!profileId) {
			this._toastrService.error('Nieprawidłowy profil', 'Błąd!');
			this._router.navigate(['/public/home']);
		} else {
			this.getProfile(Number(profileId));
			this._router.events
				.pipe(
					filter(
						(event: any) =>
							event instanceof NavigationEnd &&
							event.url.includes('/public/profile')
					)
				)
				.subscribe(() => {
					const profileId = this._route.snapshot.paramMap.get('id');
					if (profileId) {
						this.getProfile(Number(profileId));
					} else {
						this._toastrService.error('Nieprawidłowy profil', 'Błąd!');
						this._router.navigate(['/public/home']);
					}
				});
		}
	}

	private getProfile(profileId: number) {
		this.profile$ = this._userProfileApiService.getProfile(profileId).pipe(
			tap((user: IUserProfileResponseDTO) => {
				this._titleService.setTitle(
					`UniQuanda - Profil użytkownika ${user.userData.nickname}`
				);
			})
		);
	}
}

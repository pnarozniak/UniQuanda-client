import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserClaims } from 'src/app/core/models/user-claims.model';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { UserProfileResponseDTO } from './models/user-profile.dto';
import { UserProfileApiService } from './services/user-profile-api.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
	public user$: BehaviorSubject<UserProfileResponseDTO | null>;
	public userClaims$: Observable<IUserClaims | null>;

	constructor(
		private readonly _userProfileApiService: UserProfileApiService,
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _titleService: Title,
		private readonly _userDataService: UserDataService
	) {
		this.user$ = new BehaviorSubject<UserProfileResponseDTO | null>(null);
		this.userClaims$ = this._userDataService.getUserData$();
	}

	ngOnInit(): void {
		const profileId = this._route.snapshot.paramMap.get('id');
		if (!profileId) {
			this._toastrService.error('Nieprawidłowy profil', 'Błąd!');
			this._router.navigate(['/public/home']);
		} else {
			this._userProfileApiService
				.getProfile(Number(profileId))
				.subscribe((response) => {
					if (response.status === 200 && response.body) {
						const user = new UserProfileResponseDTO(response.body);
						user.academicTitles.sort((a, b) => a.order - b.order);
						user.universities.sort((a, b) => a.order - b.order);
						this.user$.next(user);
						this._titleService.setTitle(
							`UniQuanda - Profil użytkownika ${response.body?.userData.nickname}`
						);
					} else {
						this._toastrService.error('Nieprawidłowy profil', 'Błąd!');
						this._router.navigate(['/public/home']);
					}
				});
		}
	}
}

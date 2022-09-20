import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserProfileResponseDTO } from './models/user-profile.dto';
import { UserProfileApiService } from './services/user-profile-api.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
	public $user = new BehaviorSubject<UserProfileResponseDTO | null>(null);

	constructor(
		private readonly _userProfileApiService: UserProfileApiService,
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _titleService: Title
	) {}
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
						this.$user.next(new UserProfileResponseDTO(response.body));
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

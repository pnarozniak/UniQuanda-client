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
import { ISemanticScholarPaperDTO } from './models/semantic-scholar-paper.dto';
import { IUserProfileResponseDTO } from './models/user-profile.dto';
import { SemanticScholarService } from './services/semantic-scholar.service';
import { UserProfileApiService } from './services/user-profile-api.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
	public profile$ = new BehaviorSubject<IUserProfileResponseDTO | null>(null);
	public papers$ = new BehaviorSubject<ISemanticScholarPaperDTO[] | null>(null);
	public userClaims$: Observable<IUserClaims | null>;
	public subscription = new Subscription();
	private prevId: number | null = null;

	constructor(
		private readonly _userProfileApiService: UserProfileApiService,
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _titleService: Title,
		private readonly _userDataService: UserDataService,
		private readonly _semanticScholarService: SemanticScholarService
	) {
		this.profile$ = new BehaviorSubject<IUserProfileResponseDTO | null>(null);
		this.userClaims$ = this._userDataService.getUserData$();
	}

	ngOnInit(): void {
		this.subscription.add(
			this._route.paramMap.subscribe((params) => {
				const profileId = params.get('id');
				if (profileId) {
					if (this.prevId === null || this.prevId !== Number(profileId)) {
						this.getProfile(Number(profileId));
						this.prevId = Number(profileId);
					}
				} else {
					this._toastrService.error('Nieprawidłowy profil', 'Błąd!');
					this._router.navigate(['/public/home']);
				}
			})
		);
	}

	private getProfile(profileId: number): void {
		this._userProfileApiService
			.getProfile(profileId)
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
			)
			.subscribe((user) => {
				this.profile$.next(user);
				if (user.userData.semanticScholarProfile) {
					const authorId = user.userData.semanticScholarProfile
						.split('/')
						.pop();
					this._semanticScholarService
						.getPapersOfAuthor(authorId ?? '')
						.subscribe((papers) => {
							this.papers$.next(papers);
						});
				}
			});
	}

	ngOnDestroy(): void {
		this.prevId = null;
		this.subscription.unsubscribe();
	}
}

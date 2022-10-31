import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { ProfileSubpageEnum } from '../../models/profile-subpage.enum';
import { ISemanticScholarPaperDTO } from '../../models/semantic-scholar-paper.dto';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';

@Component({
	selector: 'app-profile-navigation',
	templateUrl: './profile-navigation.component.html',
	styleUrls: ['./profile-navigation.component.scss'],
})
export class ProfileNavigationComponent implements OnInit, OnDestroy {
	public activePage = ProfileSubpageEnum.Questions;
	@Input() public profile$!: Observable<IUserProfileResponseDTO | null>;
	@Input() public papers$!: Observable<ISemanticScholarPaperDTO[] | null>;

	public allTabs: ProfileSubpageEnum[] = [
		ProfileSubpageEnum.UserData,
		ProfileSubpageEnum.Questions,
		ProfileSubpageEnum.Answers,
		ProfileSubpageEnum.Tests,
	];
	public activeTab: ProfileSubpageEnum = this.allTabs[0];

	private readonly _paramSubscription = new Subscription();

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _titleService: Title
	) {}

	ngOnInit(): void {
		this._paramSubscription.add(
			this._route.queryParams.subscribe((params) => {
				const subpage = params['subpage'];
				this.activePage = ProfileSubpageEnum.Questions;
				this.allTabs.forEach((tab) => {
					if (tab.toString() === subpage) {
						this.activePage = tab;
					}
				});
			})
		);
	}

	ngOnDestroy(): void {
		this._paramSubscription.unsubscribe();
	}

	setActivePage(event: MatTabChangeEvent) {
		this.allTabs.forEach((tab, index) => {
			if (index === event.index) {
				this.activePage = tab;
			}
		});
		this._router
			.navigate([], {
				queryParams: {
					...this._route.snapshot.queryParams,
					subpage: this.activePage.toString(),
				},
				queryParamsHandling: 'merge',
				relativeTo: this._route,
			})
			.then(() => {
				this.profile$.pipe(take(1)).subscribe((user) => {
					this._titleService.setTitle(
						`UniQuanda - Profil użytkownika ${user?.userData.nickname}`
					);
				});
			});
	}

	getActiveTabId(): number {
		const breakpoint = 991;
		const index = this.allTabs.indexOf(this.activePage);
		return this.activePage === ProfileSubpageEnum.UserData &&
			window.innerWidth > breakpoint
			? 1
			: index;
	}
}

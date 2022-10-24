import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileSubpageEnum } from '../../models/profile-subpage.enum';

@Component({
	selector: 'app-profile-navigation',
	templateUrl: './profile-navigation.component.html',
	styleUrls: ['./profile-navigation.component.scss'],
})
export class ProfileNavigationComponent {
	public activePage = ProfileSubpageEnum.Questions;
	@Input() public nickname: string | undefined;
	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _titleService: Title
	) {
		this._route.queryParams.subscribe((params) => {
			switch (params['subpage']) {
				case ProfileSubpageEnum.UserData.toString():
					this.activePage = ProfileSubpageEnum.UserData;
					break;
				case ProfileSubpageEnum.Questions.toString():
					this.activePage = ProfileSubpageEnum.Questions;
					break;
				case ProfileSubpageEnum.Answers.toString():
					this.activePage = ProfileSubpageEnum.Answers;
					break;
				case ProfileSubpageEnum.Tests.toString():
					this.activePage = ProfileSubpageEnum.Tests;
					break;
				default:
					this.activePage = ProfileSubpageEnum.Questions;
			}
		});
	}

	setActivePage(page: ProfileSubpageEnum) {
		this.activePage = page;
		this._router
			.navigate([], {
				queryParams: {
					...this._route.snapshot.queryParams,
					subpage: page.toString(),
				},
				queryParamsHandling: 'merge',
				relativeTo: this._route,
			})
			.then(() => {
				this._titleService.setTitle(
					`UniQuanda - Profil użytkownika ${this.nickname}`
				);
			});
	}

	public get profileSubpage(): typeof ProfileSubpageEnum {
		return ProfileSubpageEnum;
	}
}

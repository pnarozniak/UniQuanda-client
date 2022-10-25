import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileSubpageEnum } from '../../models/profile-subpage.enum';
import { ISemanticScholarPaperDTO } from '../../models/semantic-scholar-paper.dto';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';

@Component({
	selector: 'app-profile-navigation',
	templateUrl: './profile-navigation.component.html',
	styleUrls: ['./profile-navigation.component.scss'],
})
export class ProfileNavigationComponent {
	public activePage = ProfileSubpageEnum.Questions;
	@Input() public profile$!: Observable<IUserProfileResponseDTO | null>;
	@Input() public papers$!: Observable<ISemanticScholarPaperDTO[] | null>;
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

	setActivePage(event: MatTabChangeEvent) {
		let activePage = null;
		switch (event.index) {
			case 0:
				activePage = ProfileSubpageEnum.UserData;
				break;
			case 1:
				activePage = ProfileSubpageEnum.Questions;
				break;
			case 2:
				activePage = ProfileSubpageEnum.Answers;
				break;
			case 3:
				activePage = ProfileSubpageEnum.Tests;
				break;
			default:
				activePage = ProfileSubpageEnum.Questions;
		}
		this.activePage = activePage;
		this._router
			.navigate([], {
				queryParams: {
					...this._route.snapshot.queryParams,
					subpage: activePage.toString(),
				},
				queryParamsHandling: 'merge',
				relativeTo: this._route,
			})
			.then(() => {
				this.profile$.subscribe((user) => {
					this._titleService.setTitle(
						`UniQuanda - Profil użytkownika ${user?.userData.nickname}`
					);
				});
			});
	}

	getActiveTabId(): number {
		const breakpoint = 991;
		switch (this.activePage) {
			case ProfileSubpageEnum.UserData:
				return window.innerWidth <= breakpoint ? 0 : 1;
			case ProfileSubpageEnum.Questions:
				return 1;
			case ProfileSubpageEnum.Answers:
				return 2;
			case ProfileSubpageEnum.Tests:
				return 3;
			default:
				return 1;
		}
	}
}

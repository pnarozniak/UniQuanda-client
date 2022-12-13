import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, Subscription, take, tap } from 'rxjs';
import {
	GetQuestionsRequestDTO,
	IGetQuestionsResponseDTO,
	IGetQuestionsResponseDTOQuestion,
} from '../../models/get-questions.dto';
import { ProfileSubpageEnum } from '../../models/profile-subpage.enum';
import { ISemanticScholarPaperDTO } from '../../models/semantic-scholar-paper.dto';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';
import { UserProfileApiService } from '../../services/user-profile-api.service';

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
	private userId = 0;

	public itemsOnTab = 6;

	// questions data
	private questionPages = new Map<number, IGetQuestionsResponseDTOQuestion[]>();
	public questionsRequest$ = new Observable<IGetQuestionsResponseDTO>();
	private isFirstQuestionsLoad = true;
	private totalQuestions = 0;

	private readonly _paramSubscription = new Subscription();
	private readonly _urlSubscription = new Subscription();

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _titleService: Title,
		private readonly _userProfileService: UserProfileApiService
	) {}

	ngOnInit(): void {
		this.userId = this._route.snapshot.params['id'];
		this._paramSubscription.add(
			this._route.queryParams.subscribe((params) => {
				const subpage = params['subpage'];
				this.activePage = ProfileSubpageEnum.Questions;
				this.allTabs.forEach((tab) => {
					if (tab.toString() === subpage) {
						this.activePage = tab;
					}
				});
				if (this.activePage === ProfileSubpageEnum.Questions) {
					this.loadQuestions(1);
				}
			})
		);
		this._urlSubscription.add(
			this._route.paramMap.subscribe((params) => {
				const profileId = params.get('id');
				if (profileId) {
					this.userId = Number(profileId);
					this.questionPages.clear();
					this.isFirstQuestionsLoad = true;
					this.loadQuestions(1);
				}
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

	loadQuestions(page: number) {
		if (this.questionPages.has(page)) {
			this.questionsRequest$ = of(<IGetQuestionsResponseDTO>{
				questions: this.questionPages.get(page) ?? [],
				totalCount: this.totalQuestions,
			});
		} else {
			const loadTotalCount = this.isFirstQuestionsLoad;
			this.isFirstQuestionsLoad = false;
			this.questionsRequest$ = this._userProfileService
				.getQuestions(
					new GetQuestionsRequestDTO(
						this.userId,
						page,
						this.itemsOnTab,
						loadTotalCount
					)
				)
				.pipe(
					map((response: IGetQuestionsResponseDTO) => {
						if (loadTotalCount) {
							this.totalQuestions = response.totalCount ?? 0;
						}
						return <IGetQuestionsResponseDTO>{
							questions: response.questions ?? [],
							totalCount: this.totalQuestions,
						};
					})
				)
				.pipe(
					tap((response) => {
						this.questionPages.set(page, response.questions);
					})
				);
		}
	}
}

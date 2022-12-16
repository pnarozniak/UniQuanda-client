import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subscription } from 'rxjs';
import {
	GetQuestionsRequestDto,
	IGetQuestionsResponseDtoQuestion,
} from './models/get-questions.dto';
import { IGetUniversityReponseDto } from './models/get-university.dto';
import { UniversityApiService } from './services/university-api.service';

@Component({
	selector: 'app-university',
	templateUrl: './university.component.html',
	styleUrls: ['./university.component.scss'],
})
export class UniversityComponent implements OnInit, OnDestroy {
	private readonly _subscriptionRoute: Subscription = new Subscription();
	private universityId!: number;
	public university$ = new BehaviorSubject<IGetUniversityReponseDto | null>(
		null
	);

	// questions
	public pageSize = 10;
	public page = 1;
	public pageBehavior = new BehaviorSubject<number>(this.page);
	public isLoading = true;
	private isFirstQuestionsLoad = true;
	public questions$: Observable<IGetQuestionsResponseDtoQuestion[]> = of([]);
	public totalCount = 0;
	public downloadedQuestions = new Map<
		number,
		IGetQuestionsResponseDtoQuestion[]
	>();

	constructor(
		private readonly _route: ActivatedRoute,
		private readonly _universityApiService: UniversityApiService,
		private readonly _titleService: Title
	) {}

	ngOnInit(): void {
		this._subscriptionRoute.add(
			this._route.params.subscribe((params) => {
				const paramUniversity = params['id'];
				if (paramUniversity && Number(paramUniversity) !== this.universityId) {
					this.universityId = Number(paramUniversity);
					this.page = 1;
					this.totalCount = 0;
					this.pageBehavior.next(1);
					this.isFirstQuestionsLoad = true;
					this.questions$ = of([]);
					this.downloadedQuestions.clear();
					this.getUniversity();
					this.getQuestions(1);
				}
			})
		);
	}

	ngOnDestroy(): void {
		this._subscriptionRoute.unsubscribe();
	}

	public handlePageChange(page: number) {
		this.page = page;
		this.pageBehavior.next(page);
		this.getQuestions(page);
	}

	private getUniversity() {
		this._universityApiService
			.getUniversity(this.universityId)
			.subscribe((university) => {
				this.university$.next(university);
				this._titleService.setTitle(
					`UniQuanda - Profil uczelni ${university.name}`
				);
			});
	}

	private getQuestions(page: number) {
		if (this.downloadedQuestions.has(page)) {
			this.questions$ = of(this.downloadedQuestions.get(page) ?? []);
			return;
		}

		const request = new GetQuestionsRequestDto(
			this.universityId,
			page,
			this.pageSize,
			this.isFirstQuestionsLoad
		);
		this.isLoading = true;

		this.questions$ = this._universityApiService.getQuestions(request).pipe(
			map((response) => {
				if (this.isFirstQuestionsLoad) {
					this.totalCount = response.totalCount ?? 0;
				}

				this.isLoading = false;
				this.isFirstQuestionsLoad = false;

				this.downloadedQuestions.set(page, response.questions);
				return response.questions;
			})
		);
	}
}

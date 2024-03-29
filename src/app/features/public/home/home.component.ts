import { Component, OnInit } from '@angular/core';
import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';
import { QuestionSortingBy } from './enums/question-sorting-by.enum';
import {
	IGetQuestionsRequestDto,
	IGetQuestionsResponseDtoQuestion,
} from './models/get-questions.dto';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ITag } from 'src/app/shared/models/tag.model';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { HomeApiService } from './services/home-api.service';
import { HeaderStateService } from 'src/app/core/components/header/services/header-state.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	searchTextSubmit$ = this._headerState.searchTextSubmit$.pipe(
		tap((searchText) => {
			if (this.searchText !== searchText) {
				this.searchText = searchText;
				this.getQuestions();
			}
		})
	);
	searchText = '';
	public page = 1;
	public pageSize = 10;
	public totalCount = 0;
	public questions: IGetQuestionsResponseDtoQuestion[] = [];
	public tags: number[] = [];
	public sortingBy = QuestionSortingBy.PublicationDate;
	public orderDirection = OrderDirection.Descending;

	public tagControl = new FormControl('');
	public pageBehavior = new BehaviorSubject<number>(this.page);
	public tagBehavior = new Subject<ITag[]>();

	public isLoading = true;
	public hasInitialTags = false;

	constructor(
		private readonly _homeApiService: HomeApiService,
		private readonly _location: Location,
		private readonly _route: ActivatedRoute,
		private readonly _headerState: HeaderStateService
	) {}

	ngOnInit(): void {
		const queryParams = this._route.snapshot.queryParams;
		this.searchText = queryParams['searchText'];
		if (this.searchText) {
			this._headerState.searchText = this.searchText;
			this._headerState.searchTextSubmit$.next(this.searchText);
			this._headerState.searchForResults$.next(null);
		} else {
			this.searchText = this._headerState.searchText;
			this._headerState.searchTextSubmit$.next(this.searchText);
		}

		this.page = queryParams['page'] ?? 1;
		this.pageBehavior = new BehaviorSubject<number>(this.page);
		const sortingByParam = queryParams['sortingBy'];
		this.sortingBy = sortingByParam
			? this.convertStringToSortingBy(sortingByParam)
			: QuestionSortingBy.PublicationDate;
		const orderDirectionParam = queryParams['orderDirection'];
		this.orderDirection = orderDirectionParam
			? this.convertStringToOrderDirection(orderDirectionParam)
			: OrderDirection.Descending;
		const requestTags = queryParams['tags'];
		if (requestTags !== '' && requestTags !== undefined) {
			this.tags = requestTags.split(',');
			this.hasInitialTags = true;
			this._homeApiService.getTagNames(this.tags).subscribe((tags) => {
				this.tagBehavior.next(tags);
			});
		}

		this.getQuestions(true);
	}

	public handleSortingChange(sortingBy: QuestionSortingBy) {
		this.sortingBy = sortingBy;
		this.page = 1;
		this.pageBehavior.next(this.page);
		this.getQuestions();
	}

	public handleOrderDirectionChange(orderDirection: OrderDirection) {
		this.orderDirection = orderDirection;
		this.page = 1;
		this.pageBehavior.next(this.page);
		this.getQuestions();
	}

	private getQuestions(addCount = false) {
		const request: IGetQuestionsRequestDto = {
			page: this.page,
			pageSize: this.pageSize,
			sortBy: this.sortingBy,
			orderBy: this.orderDirection,
			addCount: addCount,
			tags: this.tags,
			searchText: this.searchText,
		};
		this.isLoading = true;
		this._homeApiService.getQuestions(request).subscribe((response) => {
			this.isLoading = false;
			this._location.replaceState('/public/home', this.getParamsAsString());
			this.questions = response.questions;
			if (addCount) this.totalCount = response.count ?? 0;
		});
	}

	private getParamsAsString(): string {
		const params = new HttpParams()
			.append('page', this.page)
			.append('sortingBy', this.convertSortingByToString())
			.append('orderDirection', this.convertOrderDirectionToString())
			.append('tags', this.tags.join(','))
			.append('searchText', this.searchText ?? '');
		return params.toString();
	}

	public handlePageChanged(page: number) {
		this.page = page;
		this.getQuestions();
	}

	public handleTagsChanged(tags: ITag[]) {
		this.tags = tags.map((t) => t.id);
		this.page = 1;
		this.pageBehavior.next(this.page);
		this.getQuestions();
	}

	convertOrderDirectionToString(): string {
		switch (this.orderDirection) {
			case OrderDirection.Ascending:
				return 'asc';
			case OrderDirection.Descending:
				return 'desc';
			default:
				return 'asc';
		}
	}

	convertSortingByToString(): string {
		switch (this.sortingBy) {
			case QuestionSortingBy.PublicationDate:
				return 'publicationDate';
			case QuestionSortingBy.Answers:
				return 'answers';
			case QuestionSortingBy.Views:
				return 'views';
			default:
				return 'publicationDate';
		}
	}

	convertStringToOrderDirection(orderDirection: string): OrderDirection {
		switch (orderDirection) {
			case 'asc':
				return OrderDirection.Ascending;
			case 'desc':
				return OrderDirection.Descending;
			default:
				return OrderDirection.Descending;
		}
	}

	convertStringToSortingBy(sortingBy: string): QuestionSortingBy {
		switch (sortingBy) {
			case 'publicationDate':
				return QuestionSortingBy.PublicationDate;
			case 'answers':
				return QuestionSortingBy.Answers;
			case 'views':
				return QuestionSortingBy.Views;
			default:
				return QuestionSortingBy.PublicationDate;
		}
	}
}

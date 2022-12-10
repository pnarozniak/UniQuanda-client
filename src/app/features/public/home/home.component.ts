import { Component, OnInit } from '@angular/core';
import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';
import { QuestionSortingBy } from './enums/question-sorting-by.enum';
import {
	GetQuestionsRequestDto,
	IGetQuestionsResponseDtoQuestion,
} from './models/get-questions.dto';
import { QuestionsSerive } from './services/questions.service';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ITag } from 'src/app/shared/models/tag.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { TagNamesSerive } from './services/tag-names.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public page = 1;
	public pageSize = 10;
	public totalCount = 0;
	public questions: IGetQuestionsResponseDtoQuestion[] = [];
	public tags: number[] = [];
	// if user wants to load previous page, we don't want to make another request
	public prevQuestions = new Map<number, IGetQuestionsResponseDtoQuestion[]>();
	public sortingBy = QuestionSortingBy.PublicationDate;
	public orderDirection = OrderDirection.Descending;

	public tagControl = new FormControl('');
	public pageBehavior = new BehaviorSubject<number>(this.page);
	public tagBehavior = new Subject<ITag[]>();

	public isLoading = true;
	public hasInitialTags = false;

	constructor(
		private readonly _questionsService: QuestionsSerive,
		private readonly _tagNamesService: TagNamesSerive,
		private readonly _location: Location,
		private readonly _route: ActivatedRoute,
		private readonly _toastrService: ToastrService
	) {}
	ngOnInit(): void {
		this.page = Number.parseInt(this._route.snapshot.queryParams['page'] ?? 1);
		this.pageBehavior.next(this.page);

		const paramsSortingBy = this._route.snapshot.queryParams['sortingBy'];
		if (paramsSortingBy !== undefined) {
			switch (paramsSortingBy) {
				case 'publicationDate':
					this.sortingBy = QuestionSortingBy.PublicationDate;
					break;
				case 'answersCount':
					this.sortingBy = QuestionSortingBy.Answers;
					break;
				case 'viewsCount':
					this.sortingBy = QuestionSortingBy.Views;
					break;
				default:
					this.sortingBy = QuestionSortingBy.PublicationDate;
			}
		} else {
			this.sortingBy = QuestionSortingBy.PublicationDate;
		}

		const paramsOrderDirection =
			this._route.snapshot.queryParams['orderDirection'];
		if (paramsOrderDirection !== undefined) {
			switch (paramsOrderDirection) {
				case 'ascending':
					this.orderDirection = OrderDirection.Ascending;
					break;
				case 'descending':
					this.orderDirection = OrderDirection.Descending;
					break;
				default:
					this.orderDirection = OrderDirection.Descending;
			}
		} else {
			this.orderDirection = OrderDirection.Descending;
		}

		const requestTags = this._route.snapshot.queryParams['tags'];
		if (requestTags !== '' && requestTags !== undefined) {
			this.tags = requestTags.split(',');
			this.hasInitialTags = true;
			this._tagNamesService.getTagNames(this.tags).subscribe((tags) => {
				this.tagBehavior.next(tags);
			});
		}
		this.getQuestions(true, true);
	}

	public handleSortingChange(sortingBy: QuestionSortingBy) {
		this.sortingBy = sortingBy;
		this.page = 1;
		this.pageBehavior.next(this.page);
		this.getQuestions(true);
	}

	public handleOrderDirectionChange(orderDirection: OrderDirection) {
		this.orderDirection = orderDirection;
		this.page = 1;
		this.pageBehavior.next(this.page);
		this.getQuestions(true);
	}

	/**
	 *	Sends request to server to get questions
	 * @param sendRequest If set to true, it will disable caching and send request to server
	 * @param addCount If set to true, it will add count of questions to response
	 * @returns void
	 */
	private getQuestions(sendRequest = false, addCount = false) {
		if (!sendRequest && this.prevQuestions.has(this.page)) {
			this.questions = this.prevQuestions.get(this.page) ?? [];
			this._location.replaceState('/public/home', this.getParamsAsString());
			this.isLoading = false;
			return;
		}
		if (sendRequest) this.prevQuestions.clear();
		const request = new GetQuestionsRequestDto(
			this.page,
			this.pageSize,
			this.sortingBy,
			this.orderDirection,
			addCount,
			this.tags
		);
		this.isLoading = true;
		this._questionsService.getQuestions(request).subscribe((response) => {
			this.isLoading = false;
			this._location.replaceState('/public/home', this.getParamsAsString());
			this.questions = response.questions;
			this.prevQuestions.set(this.page, response.questions);
			if (addCount) this.totalCount = response.count ?? 0;
		});
	}

	private getParamsAsString(): string {
		let params = new HttpParams()
			.append('page', this.page)
			.append('tags', this.tags.join(','));
		switch (this.sortingBy) {
			case QuestionSortingBy.PublicationDate:
				params = params.append('sortingBy', 'publicationDate');
				break;
			case QuestionSortingBy.Answers:
				params = params.append('sortingBy', 'answersCount');
				break;
			case QuestionSortingBy.Views:
				params = params.append('sortingBy', 'viewsCount');
				break;
			default:
				params = params.append('sortingBy', 'publicationDate');
		}

		switch (this.orderDirection) {
			case OrderDirection.Ascending:
				params = params.append('orderDirection', 'ascending');
				break;
			case OrderDirection.Descending:
				params = params.append('orderDirection', 'descending');
				break;
			default:
				params = params.append('orderDirection', 'descending');
		}
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
		this.getQuestions(true, true);
	}
}

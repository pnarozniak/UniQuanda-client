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
import { BehaviorSubject } from 'rxjs';

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
	public sortingBy = QuestionSortingBy.PublicationDate;
	public orderDirection = OrderDirection.Ascending;

	public tagControl = new FormControl('');
	public pageBehavior = new BehaviorSubject<number>(this.page);

	public isLoading = true;

	constructor(
		private readonly _questionsService: QuestionsSerive,
		private readonly _location: Location,
		private readonly _route: ActivatedRoute
	) {}
	ngOnInit(): void {
		this.page = this._route.snapshot.queryParams['page'] ?? 1;
		this.pageBehavior = new BehaviorSubject<number>(this.page);
		this.sortingBy =
			this._route.snapshot.queryParams['sortingBy'] ??
			QuestionSortingBy.PublicationDate;
		this.orderDirection =
			this._route.snapshot.queryParams['orderDirection'] ??
			OrderDirection.Ascending;

		const requestTags = this._route.snapshot.queryParams['tags'];
		if (requestTags !== '' && requestTags !== undefined)
			this.tags = requestTags.split(',');
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
			if (addCount) this.totalCount = response.totalCount ?? 0;
		});
	}

	private getParamsAsString(): string {
		const params = new HttpParams()
			.append('page', this.page)
			.append('sortingBy', this.sortingBy)
			.append('orderDirection', this.orderDirection)
			.append('tags', this.tags.join(','));
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
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import GetTagsRequestDto, {
	IGetTagsResponseDto,
	ITag,
} from './models/get-tags.dto';
import { TagsApiService } from './services/tags-api.service';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';
import { Location } from '@angular/common';

@Component({
	selector: 'app-tags',
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit, OnDestroy {
	// pagination data
	public readonly _pageSize = 16;
	public totalSize = 0;

	// subscriptions
	public subscriptionParams = new Subscription();
	public subscriptionInputValue = new Subscription();

	// queryParams
	public page = 1;
	public keyword = '';
	public parentTagId?: number;
	public orderDirection = OrderDirection.Ascending;

	// data
	public tags: IGetTagsResponseDto | null = null;
	public parentTag: ITag | null = null;
	public get OrderDirection(): typeof OrderDirection {
		return OrderDirection;
	}

	// misc
	private loadTotalCount = true;
	public searchControl = new FormControl('');
	public pageBehavior = new BehaviorSubject<number | null>(null);
	private blockKeywordSearch = false;

	constructor(
		private readonly _tagsApiService: TagsApiService,
		private readonly _route: ActivatedRoute,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _location: Location
	) {}
	ngOnInit(): void {
		this.subscriptionInputValue.add(
			this.searchControl.valueChanges.subscribe((value) => {
				if (value !== this.keyword && !this.blockKeywordSearch) {
					this.page = 1;
					this.pageBehavior.next(this.page);
					this.loadTotalCount = true;
					this.keyword = value;
					this._location.replaceState('/public/tags', this.getParamsAsString());
					this.getTags();
				}
			})
		);

		this.subscriptionParams.add(
			this._route.queryParams.subscribe((params) => {
				this.blockKeywordSearch = true;
				const page = params['page'];
				const keyword = params['keyword'];
				const tagId = params['tagId'];
				const order = params['order'];

				this.searchControl.setValue('');

				this.page = page ? parseInt(page) : 1;
				this.pageBehavior.next(this.page);
				this.keyword = keyword;
				this.searchControl.setValue(this.keyword);
				this.orderDirection =
					order === 'desc'
						? OrderDirection.Descending
						: OrderDirection.Ascending;
				this.parentTagId = tagId;
				this.getTags();
			})
		);
	}

	/**
	 * Downloads data from server
	 */
	getTags(): void {
		this._tagsApiService
			.getTags(
				new GetTagsRequestDto(
					this.loadTotalCount,
					this.page,
					this._pageSize,
					this.orderDirection,
					this.parentTag === null,
					this.parentTagId,
					this.keyword
				)
			)
			.subscribe((response) => {
				if (
					(this.keyword === '' || this.keyword === undefined) &&
					this.parentTagId !== null &&
					response.tags.length === 0
				) {
					this._toastrService.error('Nie znaleziono pod-tagów', 'Bład');
					this._router.navigate(['pageNotFound']);
				}

				if (response.totalCount !== null) {
					this.totalSize = response.totalCount ?? 0;
				}

				if (response.parentTag) {
					this.parentTag = response.parentTag;
				}

				this.loadTotalCount = false;
				this.blockKeywordSearch = false;
				this.tags = response;
			});
	}

	loadSubTag(tag: any) {
		this.page = 1;
		this.keyword = '';
		this.searchControl.setValue(this.keyword);
		this.parentTagId = tag.id;
		this.parentTag = tag;
		this.orderDirection = OrderDirection.Ascending;
		this.loadTotalCount = true;
		this._router.navigate([], {
			queryParams: {
				page: this.page,
				keyword: this.keyword,
				tagId: this.parentTagId,
				order:
					this.orderDirection === OrderDirection.Ascending ? 'asc' : 'desc',
			},
			queryParamsHandling: 'merge',
			relativeTo: this._route,
		});
	}

	ngOnDestroy(): void {
		this.subscriptionParams.unsubscribe();
		this.subscriptionInputValue.unsubscribe();
	}

	pageChange(page: number): void {
		this.page = page;
		this.pageBehavior.next(page);
		this._router.navigate([], {
			queryParams: {
				page: this.page,
				keyword: this.keyword,
				tagId: this.parentTagId,
				order:
					this.orderDirection === OrderDirection.Ascending ? 'asc' : 'desc',
			},
			queryParamsHandling: 'merge',
			relativeTo: this._route,
		});
	}

	getTagTypeSearchInfo(): string {
		return `Ilość ${
			this.parentTagId ? 'pod-' : this.keyword ? 'wszystkich ' : 'głównych '
		}tagów ${
			this.keyword
				? this.parentTagId
					? `po wyszukiwaniu w tagu ${this.parentTag?.name}`
					: 'po wyszukaniu'
				: this.parentTagId // eslint-disable-next-line prettier/prettier, indent
				? `w tagu <b>${this.parentTag?.name}</b>` // eslint-disable-next-line prettier/prettier, indent
				: ''
		}:`;
	}

	changeOrderDirection(direction: OrderDirection) {
		if (this.orderDirection !== direction) {
			this.orderDirection = direction;
			this.loadTotalCount = true;
			this._router.navigate([], {
				queryParams: {
					page: this.page,
					keyword: this.keyword,
					tagId: this.parentTagId,
					order:
						this.orderDirection === OrderDirection.Ascending ? 'asc' : 'desc',
				},
				queryParamsHandling: 'merge',
				relativeTo: this._route,
			});
			this.getTags();
		}
	}

	getParamsAsString(): string {
		let params = new HttpParams().append('page', this.page);
		if (this.keyword) params = params.append('keyword', this.keyword);
		if (this.parentTagId) params = params.append('tagId', this.parentTagId);
		if (this.orderDirection === OrderDirection.Descending)
			params = params.append('order', 'desc');
		else params = params.append('order', 'asc');
		return params.toString();
	}
}

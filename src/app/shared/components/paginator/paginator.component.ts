import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges, OnInit {
	@Input() totalSize!: number;
	@Input() pageSize!: number;
	@Input() showInput = true;
	@Output() pageChange = new EventEmitter<number>();

	totalPages!: number;
	currentPage = 1;
	inputValue = '';

	constructor(
		private readonly _router: Router,
		private readonly _route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.loadQueryParams();
	}

	ngOnChanges(): void {
		this.totalPages = Math.ceil(this.totalSize / this.pageSize);
	}

	handlePageChange(pageNumber: number) {
		this.changePage(pageNumber);
	}

	handleInputEnter() {
		const pageNumber = parseInt(this.inputValue);
		this.changePage(pageNumber);
		this.inputValue = '';
	}

	pageExists(pageNumber: number): boolean {
		return pageNumber >= 1 && pageNumber <= this.totalPages;
	}

	private changePage(pageNumber: number) {
		if (isNaN(pageNumber) || !this.pageExists(pageNumber)) return;

		this.currentPage = pageNumber;
		this.pageChange.emit(this.currentPage);
		this.buildQueryParams();
	}

	private buildQueryParams(): void {
		this._router.navigate([], {
			queryParams: {
				...this._route.snapshot.queryParams,
				page: this.currentPage,
			},
		});
	}

	private loadQueryParams(): void {
		const pageNumber = parseInt(
			this._route.snapshot.queryParamMap.get('page') ?? ''
		);
		if (this.pageExists(pageNumber)) {
			this.changePage(pageNumber);
		} else {
			this.changePage(this.currentPage);
		}
	}
}

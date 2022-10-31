import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges, OnInit, OnDestroy {
	@Input() totalSize!: number;
	@Input() pageSize!: number;
	@Input() showInput = true;
	@Input() page!: Observable<number | null>;
	@Output() pageChange = new EventEmitter<number>();

	totalPages!: number;
	currentPage = 1;
	inputValue = '';

	private readonly _subscription = new Subscription();

	constructor(private readonly _route: ActivatedRoute) {}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}

	ngOnInit(): void {
		this._subscription.add(
			this.page.subscribe((page) => {
				if (page) {
					this.currentPage = page;
				}
			})
		);
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
		if (isNaN(pageNumber) || (!this.pageExists(pageNumber) && pageNumber !== 1))
			return;
		this.currentPage = pageNumber;
		this.pageChange.emit(this.currentPage);
	}
}

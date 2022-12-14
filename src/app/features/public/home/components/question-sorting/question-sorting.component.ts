import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDirection } from 'src/app/shared/enums/order-direction.enum';
import { QuestionSortingBy } from '../../enums/question-sorting-by.enum';

@Component({
	selector: 'app-question-sorting',
	templateUrl: './question-sorting.component.html',
	styleUrls: ['./question-sorting.component.scss'],
})
export class QuestionSortingComponent {
	@Input() public questionSortingBy = QuestionSortingBy.PublicationDate;
	@Input() public orderDirection = OrderDirection.Descending;

	@Output() changedSortingBy = new EventEmitter<QuestionSortingBy>();
	@Output() changedOrderDirection = new EventEmitter<OrderDirection>();

	public get sortingBy(): typeof QuestionSortingBy {
		return QuestionSortingBy;
	}

	public get orderDir(): typeof OrderDirection {
		return OrderDirection;
	}

	handleSortingByChanged(sortingBy: QuestionSortingBy): void {
		if (sortingBy === this.questionSortingBy) return;
		this.changedSortingBy.emit(sortingBy);
		this.questionSortingBy = sortingBy;
	}

	handleOrderDirectionChanged() {
		this.orderDirection =
			this.orderDirection === OrderDirection.Ascending
				? OrderDirection.Descending
				: OrderDirection.Ascending;
		this.changedOrderDirection.emit(this.orderDirection);
	}
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAnswerDetails } from '../../models/answer-details.dto';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';

@Component({
	selector: 'app-answer-details',
	templateUrl: './answer-details.component.html',
	styleUrls: ['./answer-details.component.scss'],
})
export class AnswerDetailsComponent implements OnInit {
	@Input() answer!: IAnswerDetails;
	@Input() idLoggedUser: number | null = null;
	@Input() answers: IAnswerDetails[] = [];
	@Input() isQuestionAuthor = false;
	@Input() isEvenRow = false;
	@Input() question!: IQuestionDetailsEntity;
	@Input() parentId: number | null = null;
	@Input() itemToScroll: number | null = null;
	@Input() commentToScroll: number | null = null;

	@Output() loadCommentsEvent = new EventEmitter<boolean>();

	isContentOwner = false;

	ngOnInit(): void {
		this.isContentOwner = this.answer.author.id === this.idLoggedUser;
		if (this.commentToScroll) {
			const el = document.getElementById(`comment${this.itemToScroll}`);
			if (el)
				el?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
		} else {
			const el = document.getElementById(`item${this.itemToScroll}`);
			if (el)
				el?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
		}

		if (this.answer.id === Number(this.itemToScroll)) {
			this.loadCommentsEvent.emit(true);
		}
	}
}

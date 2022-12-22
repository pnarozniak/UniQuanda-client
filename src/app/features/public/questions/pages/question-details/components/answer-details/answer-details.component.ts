import { Component, Input, OnInit } from '@angular/core';
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
	@Input() answerToScroll: number | null = null;
	@Input() commentToScroll: number | null = null;
	@Input() customId = '';

	isContentOwner = false;

	ngOnInit(): void {
		this.isContentOwner = this.answer.author.id === this.idLoggedUser;
		if (this.commentToScroll) {
			const el = document.getElementById(`comment${this.commentToScroll}`);
			el?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		} else if (this.answerToScroll && !this.commentToScroll) {
			const el = document.getElementById(`item${this.answerToScroll}`);
			el?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}
}

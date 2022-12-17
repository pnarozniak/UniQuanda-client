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

	isContentOwner = false;

	ngOnInit(): void {
		this.isContentOwner = this.answer.author.id === this.idLoggedUser;
	}
}

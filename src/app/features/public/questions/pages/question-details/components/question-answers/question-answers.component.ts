import { Component, Input } from '@angular/core';
import { IAnswerDetails } from '../../models/answer-details.dto';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';

@Component({
	selector: 'app-question-answers',
	templateUrl: './question-answers.component.html',
	styleUrls: ['./question-answers.component.scss'],
})
export default class QuestionAnswersComponent {
	@Input() idLoggedUser: number | null = null;
	@Input() answers: IAnswerDetails[] = [];
	@Input() isQuestionAuthor = false;
	@Input() question!: IQuestionDetailsEntity;
	@Input() answerToScroll: number | null = null;
	@Input() commentToScroll: number | null = null;
	@Input() customId = '';
}

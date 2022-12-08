import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pl';
import { IGetQuestionsResponseDtoQuestion } from '../../models/get-questions.dto';
@Component({
	selector: 'app-question-box',
	templateUrl: './question-box.component.html',
	styleUrls: ['./question-box.component.scss'],
})
export class QuestionBoxComponent implements OnInit {
	ngOnInit(): void {
		this.creationDate = moment(this.question.creationDate)
			.locale('pl')
			.format('ll');
	}
	public creationDate = '';

	public isProfilePictureLoading = true;

	@Input() public question!: IGetQuestionsResponseDtoQuestion;

	public genereateAnswersCountText(): string {
		if (this.question.answersCount === 0) {
			return 'Brak odpowiedzi';
		}
		if (this.question.answersCount === 1) {
			return '1 odpowiedź';
		}
		return `${this.question.answersCount} odpowiedzi`;
	}

	public generateViewsConutText(): string {
		if (this.question.views === 0) {
			return 'Brak wyświetleń';
		}
		if (this.question.views === 1) {
			return '1 wyświetlenie';
		}
		if (
			this.question.views % 10 === 2 ||
			this.question.views % 10 === 3 ||
			this.question.views % 10 === 4
		)
			return `${this.question.views} wyświetlenia`;
		return `${this.question.views} wyświetleń`;
	}
}

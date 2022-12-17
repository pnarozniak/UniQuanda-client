import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/pl';
import { IGetQuestionsResponseDtoQuestion } from '../../models/get-questions.dto';
@Component({
	selector: 'app-question-box',
	templateUrl: './question-box.component.html',
	styleUrls: ['./question-box.component.scss'],
})
export class QuestionBoxComponent {
	@Input() public set question(question: IGetQuestionsResponseDtoQuestion) {
		this.questionObj = question;
		this.creationDate = moment(question.creationDate).locale('pl').format('ll');
		this.htmlControl.setValue(question.html);
	}

	public creationDate = '';
	public htmlControl = new FormControl('');
	public isProfilePictureLoading = true;
	public questionObj!: IGetQuestionsResponseDtoQuestion;

	public generateAnswersCountText(): string {
		if (this.questionObj.answersCount === 0) {
			return 'Brak odpowiedzi';
		}
		if (this.questionObj.answersCount === 1) {
			return '1 odpowiedź';
		}
		return `${this.questionObj.answersCount} odpowiedzi`;
	}

	public generateViewsConutText(): string {
		if (this.questionObj.views === 0) {
			return 'Brak wyświetleń';
		}
		if (this.questionObj.views === 1) {
			return '1 wyświetlenie';
		}
		if (
			this.questionObj.views % 10 === 2 ||
			this.questionObj.views % 10 === 3 ||
			this.questionObj.views % 10 === 4
		)
			return `${this.questionObj.views} wyświetlenia`;
		return `${this.questionObj.views} wyświetleń`;
	}
}

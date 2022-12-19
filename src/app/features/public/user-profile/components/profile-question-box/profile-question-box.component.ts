import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { IGetQuestionsResponseDTOQuestion } from '../../models/get-questions.dto';

@Component({
	selector: 'app-profile-question-box',
	templateUrl: './profile-question-box.component.html',
	styleUrls: ['./profile-question-box.component.scss'],
})
export class ProfileQuestionBoxComponent {
	public htmlControl = new FormControl('');
	@Input() public set question(question: IGetQuestionsResponseDTOQuestion) {
		this.questionObj = question;
		this.creationDate = moment(question.createdAt).locale('pl').format('ll');
		this.htmlControl.setValue(question.html);
	}

	public creationDate = '';
	public questionObj!: IGetQuestionsResponseDTOQuestion;
	public genereateAnswersCountText(): string {
		if (this.questionObj.answers === 0) {
			return 'Brak odpowiedzi';
		}
		if (this.questionObj.answers === 1) {
			return '1 odpowiedź';
		}
		return `${this.questionObj.answers} odpowiedzi`;
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

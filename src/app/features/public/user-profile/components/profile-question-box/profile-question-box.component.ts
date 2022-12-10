import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { IGetQuestionsResponseDTOQuestion } from '../../models/get-questions.dto';

@Component({
	selector: 'app-profile-question-box',
	templateUrl: './profile-question-box.component.html',
	styleUrls: ['./profile-question-box.component.scss'],
})
export class ProfileQuestionBoxComponent {
	@Input() public question!: IGetQuestionsResponseDTOQuestion;
	ngOnInit(): void {
		this.creationDate = moment(this.question.createdAt)
			.locale('pl')
			.format('ll');
	}
	public creationDate = '';

	public isProfilePictureLoading = true;
	public genereateAnswersCountText(): string {
		if (this.question.answers === 0) {
			return 'Brak odpowiedzi';
		}
		if (this.question.answers === 1) {
			return '1 odpowiedź';
		}
		return `${this.question.answers} odpowiedzi`;
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

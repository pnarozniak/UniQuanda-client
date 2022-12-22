import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { IGetAnswersResponseDtoAnswer } from '../../models/get-answers.dto';

@Component({
	selector: 'app-profile-answer-box',
	templateUrl: './profile-answer-box.component.html',
	styleUrls: ['./profile-answer-box.component.scss'],
})
export class ProfileAnswerBoxComponent {
	public htmlControl = new FormControl('');
	@Input() public set answer(answer: IGetAnswersResponseDtoAnswer) {
		this.answerObj = answer;
		this.creationDate = moment(answer.createdAt).locale('pl').format('ll');
		this.htmlControl.setValue(answer.html);
	}

	public creationDate = '';
	public answerObj!: IGetAnswersResponseDtoAnswer;

	public generateLikeText(likes: number): string {
		if (likes === 0) {
			return 'Brak polubień';
		}
		if (likes === 1) {
			return '1 polubienie';
		}
		if (likes % 100 >= 12 && likes % 100 <= 14) {
			return `${likes} polubień`;
		}
		if (likes % 10 >= 2 && likes % 10 <= 4) {
			return `${likes} polubienia`;
		}
		return `${likes} polubień`;
	}

	generateDetailsParams(answer: IGetAnswersResponseDtoAnswer) {
		if (answer.parentId) {
			return {
				answer: answer.parentId,
				comment: answer.id,
			};
		}
		return {
			answer: answer.id,
		};
	}
}

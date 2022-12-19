import { Component, Input } from '@angular/core';
import { IAnswerDetails } from '../../models/answer-details.dto';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';
import { AnswersApiService } from '../../services/answers-api.service';

@Component({
	selector: 'app-question-answers',
	templateUrl: './question-answers.component.html',
	styleUrls: ['./question-answers.component.scss'],
})
export class QuestionAnswersComponent {
	@Input() idLoggedUser: number | null = null;
	@Input() answers: IAnswerDetails[] = [];
	@Input() isQuestionAuthor = false;
	@Input() question!: IQuestionDetailsEntity;

	public isCommentsDisabled = true;

	constructor(private readonly _answersApiService: AnswersApiService) {}

	updateCommentsVisibility(): void {
		this.isCommentsDisabled = !this.isCommentsDisabled;
	}

	public generateCommentsCountText(commentsAmount: number): string {
		if (commentsAmount === 1) {
			return '1 odpowiedź';
		}
		return `${commentsAmount} odpowiedzi`;
	}

	getAllComments(answer: IAnswerDetails): void {
		this._answersApiService.getAllComments(answer.id).subscribe({
			next: (res) => {
				answer.comments = res.body!.comments;
			},
		});
	}
}
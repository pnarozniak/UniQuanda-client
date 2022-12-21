import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Component, Input } from '@angular/core';
import { IAnswerDetails } from '../../models/answer-details.dto';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';
import { AnswersApiService } from '../../services/answers-api.service';

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
	@Input() itemToScroll: number | null = null;
	@Input() commentToScroll: number | null = null;
	@Input() customId = '';

	public isCommentsDisabled = true;

	constructor(
		private readonly _answersApiService: AnswersApiService,
		private readonly _loader: LoaderService
	) {}

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
		this._loader.show();
		this._answersApiService
			.getAllComments(answer.id)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: (res) => {
					answer.comments = res.body!.comments;
				},
			});
	}
}

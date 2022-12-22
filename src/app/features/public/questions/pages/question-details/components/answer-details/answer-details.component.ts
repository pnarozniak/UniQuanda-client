import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IAnswerDetails } from '../../models/answer-details.dto';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';
import { AnswersApiService } from '../../services/answers-api.service';

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
	@Input() i!: number;

	public isContentOwner = false;
	public isCommentsDisabled = true;

	constructor(
		private readonly _answersApiService: AnswersApiService,
		private readonly _loader: LoaderService
	) {}

	ngOnInit(): void {
		this.isContentOwner = this.answer.author.id === this.idLoggedUser;
		if (this.commentToScroll) {
			const el = document.getElementById(`comment${this.commentToScroll}`);
			el?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		} else if (this.answerToScroll && !this.commentToScroll) {
			const el = document.getElementById(`item${this.answerToScroll}`);
			el?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}

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

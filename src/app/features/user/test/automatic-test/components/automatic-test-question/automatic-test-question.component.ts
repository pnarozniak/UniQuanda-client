import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { IAutomaticTestAnswer } from '../../models/automatic-test-answer.model';
import { IAutomaticTestQuestion } from '../../models/automatic-test-question.model';
import { AutomaticTestApiService } from '../../services/automatic-test-api.service';

@Component({
	selector: 'app-automatic-test-question',
	templateUrl: './automatic-test-question.component.html',
	styleUrls: ['./automatic-test-question.component.scss'],
})
export class AutomaticTestQuestionComponent implements OnChanges {
	@Input() activeQuestion: IAutomaticTestQuestion | null = null;
	@Input() activeQuestionNumber = 1;
	questionHTMLControl: FormControl | null = null;
	moment = moment;
	questionsWithVisibleAnswers: number[] = [];
	comments: {
		questionId: number;
		values: IAutomaticTestAnswer[];
		expanded: boolean;
	}[] = [];

	constructor(
		private automaticTestApi: AutomaticTestApiService,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.questionHTMLControl = null;
		this.changeDetectorRef.detectChanges();
		this.questionHTMLControl = new FormControl(this.activeQuestion?.html);
	}

	showAnswer(questionId: number) {
		this.questionsWithVisibleAnswers.push(questionId);
	}

	isAnswerVisible() {
		return this.questionsWithVisibleAnswers.includes(
			this.activeQuestion?.id || -1
		);
	}

	parseCommentsCount(commentsCount: number): string {
		return `${commentsCount} ${
			commentsCount === 1 ? 'odpowiedź' : 'odpowiedzi'
		}`;
	}

	getComments() {
		return this.comments.find((c) => c.questionId === this.activeQuestion?.id)
			?.values;
	}

	areCommentsExpanded() {
		return this.comments.find((c) => c.questionId === this.activeQuestion?.id)
			?.expanded;
	}

	toggleComments() {
		const comment = this.comments.find(
			(c) => c.questionId === this.activeQuestion?.id
		);

		if (!comment) {
			this.automaticTestApi
				.getAllComments$(this.activeQuestion!.id)
				.subscribe((comments) => {
					this.comments = [
						...this.comments,
						{
							questionId: this.activeQuestion!.id,
							values: comments,
							expanded: true,
						},
					];
				});
		} else {
			comment.expanded = !comment.expanded;
			this.comments = [
				...this.comments.filter(
					(c) => c.questionId !== this.activeQuestion?.id
				),
				comment,
			];
		}
	}
}

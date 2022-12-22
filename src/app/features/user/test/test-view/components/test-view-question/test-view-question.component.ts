import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ITestAnswer } from '../../models/test-answer.model';
import { ITestQuestion } from '../../models/test-question.model';
import { TestViewApiService } from '../../services/test-view-api.service';

@Component({
	selector: 'app-test-view-question',
	templateUrl: './test-view-question.component.html',
	styleUrls: ['./test-view-question.component.scss'],
})
export class TestViewQuestionComponent implements OnChanges {
	@Input() activeQuestion: ITestQuestion | null = null;
	@Input() activeQuestionNumber = 1;
	questionHTMLControl: FormControl | null = null;
	moment = moment;
	questionsWithVisibleAnswers: number[] = [];
	comments: {
		questionId: number;
		values: ITestAnswer[];
		expanded: boolean;
	}[] = [];

	constructor(
		private testViewApi: TestViewApiService,
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
			this.testViewApi
				.getAllComments$(this.activeQuestion!.answer.id)
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

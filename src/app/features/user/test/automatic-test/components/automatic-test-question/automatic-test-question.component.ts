import {
	ChangeDetectorRef,
	Component,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { IAutomaticTestQuestion } from '../../models/get-automatic-test.dto';

@Component({
	selector: 'app-automatic-test-question',
	templateUrl: './automatic-test-question.component.html',
	styleUrls: ['./automatic-test-question.component.scss'],
})
export class AutomaticTestQuestionComponent implements OnChanges {
	@Input() activeQuestion: IAutomaticTestQuestion | null = null;
	questionHTMLControl: FormControl | null = null;
	moment = moment;
	visibleAnswers: number[] = [];

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.questionHTMLControl = null;
		this.changeDetectorRef.detectChanges();
		this.questionHTMLControl = new FormControl(this.activeQuestion?.html);
	}

	showAnswer(questionId: number) {
		this.visibleAnswers.push(questionId);
	}

	isAnswerVisible() {
		return this.visibleAnswers.includes(this.activeQuestion!.id);
	}
}

import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGetTestResponseDTO } from '../../models/get-test.dto';
import { ITestQuestion } from '../../models/test-question.model';

@Component({
	selector: 'app-test-view-nav',
	templateUrl: './test-view-nav.component.html',
	styleUrls: ['./test-view-nav.component.scss'],
	animations: [
		trigger('expandCollapse', [
			state(
				'expanded',
				style({
					overflow: 'hidden',
					height: '*',
				})
			),
			state(
				'collapsed',
				style({
					overflow: 'hidden',
					height: '0px',
				})
			),
			transition('expanded => collapsed', animate('150ms ease-in')),
			transition('collapsed => expanded', animate('150ms ease-out')),
		]),
	],
})
export class TestViewNavComponent {
	@Input() test: IGetTestResponseDTO | null = null;

	@Input() activeQuestion: ITestQuestion | null = null;
	@Output() activeQuestionChange = new EventEmitter<ITestQuestion>();

	expanded = true;

	changeQuestion(question: ITestQuestion) {
		this.activeQuestion = question;
		this.activeQuestionChange.emit(this.activeQuestion);
	}
}

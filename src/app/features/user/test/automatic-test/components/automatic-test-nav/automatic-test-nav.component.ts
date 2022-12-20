import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAutomaticTestQuestion } from '../../models/automatic-test-question.model';
import { IGetAutomaticTestResponseDTO } from '../../models/get-automatic-test.dto';

@Component({
	selector: 'app-automatic-test-nav',
	templateUrl: './automatic-test-nav.component.html',
	styleUrls: ['./automatic-test-nav.component.scss'],
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
export class AutomaticTestNavComponent {
	@Input() test: IGetAutomaticTestResponseDTO | null = null;

	@Input() activeQuestion: IAutomaticTestQuestion | null = null;
	@Output() activeQuestionChange = new EventEmitter<IAutomaticTestQuestion>();

	expanded = true;

	changeQuestion(question: IAutomaticTestQuestion) {
		this.activeQuestion = question;
		this.activeQuestionChange.emit(this.activeQuestion);
	}
}

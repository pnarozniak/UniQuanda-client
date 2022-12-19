import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	IAutomaticTestQuestion,
	IGetAutomaticTestResponseDTO,
} from '../../models/get-automatic-test.dto';

@Component({
	selector: 'app-automatic-test-nav',
	templateUrl: './automatic-test-nav.component.html',
	styleUrls: ['./automatic-test-nav.component.scss'],
})
export class AutomaticTestNavComponent {
	@Input() test: IGetAutomaticTestResponseDTO | null = null;

	@Input() activeQuestion: IAutomaticTestQuestion | null = null;
	@Output() activeQuestionChange = new EventEmitter<IAutomaticTestQuestion>();

	changeQuestion(question: IAutomaticTestQuestion) {
		this.activeQuestion = question;
		this.activeQuestionChange.emit(this.activeQuestion);
	}
}

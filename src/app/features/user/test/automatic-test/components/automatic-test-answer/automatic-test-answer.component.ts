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

@Component({
	selector: 'app-automatic-test-answer',
	templateUrl: './automatic-test-answer.component.html',
	styleUrls: ['./automatic-test-answer.component.scss'],
})
export class AutomaticTestAnswerComponent implements OnChanges {
	@Input() answer!: IAutomaticTestAnswer;
	answerHTMLControl: FormControl | null = new FormControl('');
	moment = moment;

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.answerHTMLControl = null;
		this.changeDetectorRef.detectChanges();
		this.answerHTMLControl = new FormControl(this.answer?.html);
	}
}

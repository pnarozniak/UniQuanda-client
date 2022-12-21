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

@Component({
	selector: 'app-test-view-answer',
	templateUrl: './test-view-answer.component.html',
	styleUrls: ['./test-view-answer.component.scss'],
})
export class TestViewAnswerComponent implements OnChanges {
	@Input() answer!: ITestAnswer;
	answerHTMLControl: FormControl | null = new FormControl('');
	moment = moment;

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.answerHTMLControl = null;
		this.changeDetectorRef.detectChanges();
		this.answerHTMLControl = new FormControl(this.answer?.html);
	}
}

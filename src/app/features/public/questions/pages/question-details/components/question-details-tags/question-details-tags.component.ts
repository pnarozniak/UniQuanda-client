import { Component, Input } from '@angular/core';
import { IQuestionDetailsTag } from '../../models/question-details.dto';

@Component({
	selector: 'app-question-details-tags',
	templateUrl: './question-details-tags.component.html',
	styleUrls: ['./question-details-tags.component.scss'],
})
export class QuestionDetailsTagsComponent {
	@Input() tags: IQuestionDetailsTag[] = [];
}

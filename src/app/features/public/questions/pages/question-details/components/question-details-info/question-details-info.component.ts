import { Component, Input } from '@angular/core';
import { StaticImageSrc } from 'src/app/shared/enums/static-image-src.enum';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';

@Component({
	selector: 'app-question-details-info',
	templateUrl: './question-details-info.component.html',
	styleUrls: ['./question-details-info.component.scss'],
})
export class QuestionDetailsInfoComponent {
	@Input() question!: IQuestionDetailsEntity;

	public staticImageSrc = StaticImageSrc;
}

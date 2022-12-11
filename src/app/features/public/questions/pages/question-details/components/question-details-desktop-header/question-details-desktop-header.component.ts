import { Component, Input } from '@angular/core';
import { StaticImageSrc } from 'src/app/shared/enums/static-image-src.enum';
import { IQuestionDetailsEntity } from '../../models/question-details.dto';

@Component({
	selector: 'app-question-details-desktop-header',
	templateUrl: './question-details-desktop-header.component.html',
	styleUrls: ['./question-details-desktop-header.component.scss'],
})
export class QuestionDetailsDesktopHeaderComponent {
	@Input() question!: IQuestionDetailsEntity;
	@Input() idLoggedUser: number | null = null;

	public staticImageSrc = StaticImageSrc;
}

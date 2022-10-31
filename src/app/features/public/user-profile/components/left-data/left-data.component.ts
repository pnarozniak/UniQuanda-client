import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';
import { ISemanticScholarPaperDTO } from '../../models/semantic-scholar-paper.dto';

@Component({
	selector: 'app-user-profile-left-data',
	templateUrl: './left-data.component.html',
	styleUrls: ['./left-data.component.scss'],
})
export class ProfileLeftDataComponent {
	@Input()
	public profile$!: Observable<IUserProfileResponseDTO | null>;

	@Input()
	public papers$!: Observable<ISemanticScholarPaperDTO[] | null>;

	public readonly _moment = moment;

	generatePointsSuffix(points: number): string {
		if (points === 1) {
			return 'punkt';
		}
		const pointsAsString = points.toString();
		const lastDigit = parseInt(pointsAsString[pointsAsString.length - 1]);
		if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
			return 'punkty';
		}
		return 'punktów';
	}
}

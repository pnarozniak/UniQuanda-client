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
		if (points === 0) return 'Brak punktów';
		if (points === 1) {
			return `${points} punkt`;
		} else if (points % 100 >= 12 && points % 100 <= 14) {
			return `${points} punktów`;
		} else if (points % 10 > 1 && points % 10 < 5) {
			return `${points} punkty`;
		}
		return `${points} punktów`;
	}
}

import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';
import { SemanticScholarService } from '../../services/semantic-scholar.service';
import { ISemanticScholarPaperDTO } from '../../models/semantic-scholar-paper.dto';

@Component({
	selector: 'app-user-profile-user-data',
	templateUrl: './user-data.component.html',
	styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
	@Input()
	public profile$!: Observable<IUserProfileResponseDTO | null>;

	public papers$!: Observable<ISemanticScholarPaperDTO[]>;

	public readonly _moment = moment;

	constructor(
		private readonly _semanticScholarService: SemanticScholarService
	) {}

	ngOnInit(): void {
		this.profile$.subscribe((profile) => {
			if (profile && profile.userData.semanticScholarProfile) {
				this.papers$ = this.getAcademicPapers(
					profile.userData.semanticScholarProfile
				);
			}
		});
	}

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

	getAcademicPapers(semanticScholarProfile: string) {
		const profileId = semanticScholarProfile.split('/').pop();
		return this._semanticScholarService.getPapersOfAuthor(profileId ?? '');
	}
}

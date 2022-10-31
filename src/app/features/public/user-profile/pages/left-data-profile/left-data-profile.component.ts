import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ISemanticScholarPaperDTO } from '../../models/semantic-scholar-paper.dto';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';

@Component({
	selector: 'app-left-data-profile',
	templateUrl: './left-data-profile.component.html',
	styleUrls: ['./left-data-profile.component.scss'],
})
export class LeftDataProfileComponent {
	@Input()
	public profile$!: Observable<IUserProfileResponseDTO | null>;
	@Input()
	public papers$!: Observable<ISemanticScholarPaperDTO[] | null>;
}

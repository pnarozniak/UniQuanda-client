import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ISemanticScholarPaperDTO } from '../../models/semantic-scholar-paper.dto';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';

@Component({
	selector: 'app-user-data-profile',
	templateUrl: './user-data-profile.component.html',
	styleUrls: ['./user-data-profile.component.scss'],
})
export class UserDataProfileComponent {
	@Input()
	public profile$!: Observable<IUserProfileResponseDTO | null>;
	@Input()
	public papers$!: Observable<ISemanticScholarPaperDTO[] | null>;
}

import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetUniversityReponseDto } from '../../models/get-university.dto';

@Component({
	selector: 'app-university-header',
	templateUrl: './university-header.component.html',
	styleUrls: ['./university-header.component.scss'],
})
export class UniversityHeaderComponent {
	public logoLoading = true;
	@Input() public university!: Observable<IGetUniversityReponseDto | null>;
}

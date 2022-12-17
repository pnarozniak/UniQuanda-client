import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ITitleRequest } from '../../models/title-request.dto';
import * as moment from 'moment';
import { AcademicTitleRequestStatusEnum } from '../../enums/academic-title-request-status.enum';

@Component({
	selector: 'app-title-request-history',
	templateUrl: './title-request-history.component.html',
	styleUrls: ['./title-request-history.component.scss'],
})
export class TitleRequestHistoryComponent {
	public readonly _moment = moment;
	@Input() public requestedTitles!: Observable<ITitleRequest[]>;

	getStatusText(status: AcademicTitleRequestStatusEnum) {
		let result = 'Oczekiwanie na weryfikacje';
		switch (status) {
			case AcademicTitleRequestStatusEnum.Accepted:
				result = 'Przyznany';
				break;
			case AcademicTitleRequestStatusEnum.Pending:
				result = 'Oczekiwanie na weryfikacje';
				break;
			case AcademicTitleRequestStatusEnum.ActionRequired:
				result = 'Wymagane działanie';
				break;
			case AcademicTitleRequestStatusEnum.Rejected:
				result = 'Odrzucony';
				break;
			default:
				result = 'Oczekiwanie na weryfikacje';
		}
		return result;
	}
	getStatusClass(status: AcademicTitleRequestStatusEnum) {
		let result = 'gray';
		switch (status) {
			case AcademicTitleRequestStatusEnum.Accepted:
				result = 'green';
				break;
			case AcademicTitleRequestStatusEnum.Pending:
				result = 'gray';
				break;
			case AcademicTitleRequestStatusEnum.ActionRequired:
				result = 'blue';
				break;
			case AcademicTitleRequestStatusEnum.Rejected:
				result = 'red';
				break;
			default:
				result = 'gray';
		}
		return result;
	}

	public get TitleStatus(): typeof AcademicTitleRequestStatusEnum {
		return AcademicTitleRequestStatusEnum;
	}
}

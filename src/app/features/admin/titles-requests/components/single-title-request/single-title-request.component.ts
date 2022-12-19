import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AcademicTitleRequestStatusEnum } from 'src/app/shared/enums/academic-title-request-status.enum';
import { ChangeRequestStausRequestDTO } from '../../models/change-request-status.dto';
import { ITitleRequest } from '../../models/title-request.dto';
import { TitleRequestApiService } from '../../services/title-request.api.service';

@Component({
	selector: 'app-single-title-request',
	templateUrl: './single-title-request.component.html',
	styleUrls: ['./single-title-request.component.scss'],
})
export class SingleTitleRequestComponent {
	constructor(
		private readonly _titleRequestApiService: TitleRequestApiService,
		private readonly _toastrService: ToastrService,
		private readonly _loader: LoaderService
	) {}
	public isDisabled = false;
	public selected: AcademicTitleRequestStatusEnum | null = null;

	public get StatusEnum(): typeof AcademicTitleRequestStatusEnum {
		return AcademicTitleRequestStatusEnum;
	}

	@Input() public request!: ITitleRequest;

	handleActionClick() {
		this._loader.show();
		this.isDisabled = true;
		const request = new ChangeRequestStausRequestDTO(
			this.request.id,
			this.selected!
		);
		this._titleRequestApiService
			.setStatusToRequest(request)
			.subscribe((response) => {
				this._loader.hide();
				if (response) {
					this._toastrService.success('Status został zmieniony', 'Sukces');
				} else {
					this._toastrService.success('Coś poszło nie tak', 'Błąd');
				}
			});
	}
	handleSelected(selectedResult: AcademicTitleRequestStatusEnum) {
		this.selected = selectedResult;
	}
}

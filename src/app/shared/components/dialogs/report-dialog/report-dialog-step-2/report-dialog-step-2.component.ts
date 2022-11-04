import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import ApiService from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IReportDialogData } from 'src/app/shared/models/report-dialog-data.model';
import { IReportType, ReportDialogComponent } from '../report-dialog.component';

@Component({
	selector: 'app-report-dialog-step-2',
	templateUrl: './report-dialog-step-2.component.html',
	styleUrls: ['./report-dialog-step-2.component.scss'],
})
export class ReportDialogStep2Component {
	@Input() data!: IReportDialogData;
	@Input() selectedReportType!: IReportType;
	@Input() view!: 'step-1' | 'step-2';
	@Output() viewChange = new EventEmitter<'step-1' | 'step-2'>();

	fc = new FormControl('', Validators.maxLength(300));

	constructor(
		private readonly _api: ApiService,
		private readonly _loader: LoaderService,
		private readonly _toastr: ToastrService,
		private readonly _matDialogRef: MatDialogRef<ReportDialogComponent>
	) {}

	createReport() {
		if (this.fc.invalid) return;

		const body: ICreateReportDTO = {
			reportedEntityId: this.data.reportedEntityId,
			reportTypeId: this.selectedReportType.id,
			description: this.fc.value,
		};

		this._loader.show();
		this._api
			.post<ICreateReportDTO, unknown>(
				'report',
				body,
				RecaptchaAction.CREATE_REPORT
			)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					this._toastr.success(
						'Dziękujemy, nasz zespół przeanalizuje twoje zgłoszenie.',
						'Zgłoszenie przyjęte'
					);
					this._matDialogRef.close();
				},
				error: () => {
					this._toastr.error(
						'Przepraszamy, spróbuj ponownie poźniej',
						'Wystąpił błąd'
					);
				},
			});
	}
}

interface ICreateReportDTO {
	reportedEntityId: number;
	reportTypeId: number;
	description?: string;
}

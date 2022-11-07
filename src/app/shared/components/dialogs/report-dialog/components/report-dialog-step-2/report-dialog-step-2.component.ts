import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IReportDialogData } from 'src/app/shared/models/report-dialog-data.model';
import { ICreateReportDTO } from '../../models/create-report.dto';
import { IReportType } from '../../models/report-type.model';
import { ReportDialogComponent } from '../../report-dialog.component';
import { ReportDialogApiService } from '../../services/report-dialog-api.service';

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
		private readonly _reportDialogApiService: ReportDialogApiService,
		private readonly _loader: LoaderService,
		private readonly _toastr: ToastrService,
		private readonly _matDialogRef: MatDialogRef<ReportDialogComponent>
	) {}

	createReport() {
		if (this.fc.invalid) return;

		const newReport: ICreateReportDTO = {
			reportedEntityId: this.data.reportedEntityId,
			reportTypeId: this.selectedReportType.id,
			description: this.fc.value,
		};

		this._loader.show();
		this._reportDialogApiService
			.createReport(newReport)
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

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IReportDialogData } from 'src/app/shared/models/report-dialog-data.model';
import { IReportType } from './models/report-type.model';
import { ReportDialogApiService } from './services/report-dialog-api.service';

@Component({
	selector: 'app-report-dialog',
	templateUrl: './report-dialog.component.html',
	styleUrls: ['./report-dialog.component.scss'],
})
export class ReportDialogComponent implements OnInit {
	view: 'step-1' | 'step-2' = 'step-1';
	reportTypes: IReportType[] = [];
	selectedReportType!: IReportType;

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: IReportDialogData,
		private readonly _reportDialogApiService: ReportDialogApiService,
		private readonly _loader: LoaderService,
		private readonly _dialogRef: MatDialogRef<ReportDialogComponent>
	) {}

	ngOnInit(): void {
		this.getReportTypes();
	}

	private getReportTypes() {
		this._loader.show();
		this._reportDialogApiService
			.getReportTypes(this.data.reportCategory)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: (response) => (this.reportTypes = response.items),
				error: () => this._dialogRef.close(),
			});
	}
}

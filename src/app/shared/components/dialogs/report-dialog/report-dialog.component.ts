import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import ApiService from 'src/app/core/services/api.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { IReportDialogData } from 'src/app/shared/models/report-dialog-data.model';

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
		private readonly _api: ApiService,
		private readonly _loader: LoaderService,
		private readonly _dialogRef: MatDialogRef<ReportDialogComponent>
	) {}

	ngOnInit(): void {
		this.getReportTypes();
	}

	private getReportTypes() {
		this._loader.show();
		this._api
			.get<{ items: IReportType[] }>(
				'report/types',
				new HttpParams().append(this.data.reportType, true)
			)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: (res) => (this.reportTypes = res.body!.items),
				error: () => this._dialogRef.close(),
			});
	}
}

export interface IReportType {
	id: number;
	name: string;
}

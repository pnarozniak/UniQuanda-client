import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IReportDialogData } from 'src/app/shared/models/report-dialog-data.model';
import { IReportType } from '../report-dialog.component';

@Component({
	selector: 'app-report-dialog-step-1',
	templateUrl: './report-dialog-step-1.component.html',
	styleUrls: ['./report-dialog-step-1.component.scss'],
})
export class ReportDialogStep1Component {
	@Input() data!: IReportDialogData;
	@Input() reportTypes: IReportType[] = [];

	@Input() view!: 'step-1' | 'step-2';
	@Output() viewChange = new EventEmitter<'step-1' | 'step-2'>();

	@Input() selectedReportType?: IReportType;
	@Output() selectedReportTypeChange = new EventEmitter<IReportType>();

	selectReportType(reportType: IReportType) {
		this.viewChange.emit('step-2');
		this.selectedReportTypeChange.emit(reportType);
	}
}

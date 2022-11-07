import { HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecaptchaAction } from 'src/app/core/enums/recaptcha-action.enum';
import ApiService from 'src/app/core/services/api.service';
import { ICreateReportDTO } from '../models/create-report.dto';
import { IGetReportTypesDTO } from '../models/get-report-types.dto';

@Injectable()
export class ReportDialogApiService {
	constructor(private readonly _api: ApiService) {}

	/**
	 * @description Executes a call to api to get report types from given category
	 * @param reportCategory Category of report types
	 * @returns Observable<IGetReportTypesDTO>
	 */
	getReportTypes(
		reportCategory: 'user' | 'question' | 'answer'
	): Observable<IGetReportTypesDTO> {
		return this._api
			.get<IGetReportTypesDTO>(
				'report/types',
				new HttpParams().append(reportCategory, true)
			)
			.pipe(map((res) => res.body as IGetReportTypesDTO));
	}

	/**
	 * @description Executes a call to api to create report
	 * @param data Report data
	 * @returns Observable<HttpResponse<unknown>>
	 */
	createReport(data: ICreateReportDTO): Observable<HttpResponse<unknown>> {
		return this._api.post<ICreateReportDTO, unknown>(
			'report',
			data,
			RecaptchaAction.CREATE_REPORT
		);
	}
}

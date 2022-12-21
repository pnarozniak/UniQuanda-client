import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IUserTestResponseDTO } from '../../models/get-user-tests.dto';
import { TestsDashboardApiService } from '../../services/tests-dashboard-api.service';

@Component({
	selector: 'app-tests-history',
	templateUrl: './tests-history.component.html',
	styleUrls: ['./tests-history.component.scss'],
})
export class TestsHistoryComponent implements OnInit {
	tests: IUserTestResponseDTO[] | null = null;
	loadingItems = [0, 1, 2];
	moment = moment;
	constructor(private testsDashboardApi: TestsDashboardApiService) {}

	ngOnInit(): void {
		this.testsDashboardApi.getUserTests$().subscribe(({ tests }) => {
			this.tests = tests.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		});
	}
}

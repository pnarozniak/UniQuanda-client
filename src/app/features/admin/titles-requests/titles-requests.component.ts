import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { GetTitleRequestDTO, ITitleRequest } from './models/title-request.dto';
import { TitleRequestApiService } from './services/title-request.api.service';

@Component({
	selector: 'app-titles-requests',
	templateUrl: './titles-requests.component.html',
	styleUrls: ['./titles-requests.component.scss'],
})
export class TitlesRequestsComponent implements OnInit {
	public requests$: Observable<ITitleRequest[]> = of([]);
	public totalCount = 0;
	public pageSize = 10;
	public pageBehavior$ = new BehaviorSubject<number>(1);
	constructor(
		private readonly _titleRequestApiService: TitleRequestApiService
	) {}

	ngOnInit(): void {
		this.getRequests(1, true);
	}

	handlePageChanged(page: number) {
		this.getRequests(page);
		this.pageBehavior$.next(page);
	}

	private getRequests(page: number, addCount = false) {
		const requestData = new GetTitleRequestDTO(page, this.pageSize, addCount);
		this.requests$ = this._titleRequestApiService.getRequests(requestData).pipe(
			map((response) => {
				if (addCount) {
					this.totalCount = response.totalCount ?? 0;
				}
				return response.requests ?? [];
			})
		);
	}
}

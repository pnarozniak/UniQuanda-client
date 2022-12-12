import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGetRankingResponseDTO } from '../../models/get-ranking.model';

@Component({
	selector: 'app-ranking-global',
	templateUrl: './ranking-global.component.html',
	styleUrls: ['./ranking-global.component.scss'],
})
export class RankingGlobalComponent {
	@Input() public response$!: Observable<IGetRankingResponseDTO>;
	@Output() public pageChangedEvent: EventEmitter<number> = new EventEmitter();
	public readonly _pageSize = 10;
	public page$ = new BehaviorSubject<number>(1);
	handlePageChanged(page: number): void {
		this.page$.next(page);
		this.pageChangedEvent.emit(page);
	}
}

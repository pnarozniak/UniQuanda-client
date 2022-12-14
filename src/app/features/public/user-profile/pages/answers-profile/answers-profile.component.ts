import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGetAnswersResponseDto } from '../../models/get-answers.dto';

@Component({
	selector: 'app-answers-profile',
	templateUrl: './answers-profile.component.html',
	styleUrls: ['./answers-profile.component.scss'],
})
export class AnswersProfileComponent {
	@Input() public answersResponse!: Observable<IGetAnswersResponseDto>;
	@Input() public answersOnPage!: number;
	@Output() public pageChangedEvent: EventEmitter<number> = new EventEmitter();
	public page$ = new BehaviorSubject<number>(1);

	handlePageChanged(page: number): void {
		this.page$.next(page);
		this.pageChangedEvent.emit(page);
	}
}

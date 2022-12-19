import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGetQuestionsResponseDTO } from '../../models/get-questions.dto';

@Component({
	selector: 'app-questions-profile',
	templateUrl: './questions-profile.component.html',
	styleUrls: ['./questions-profile.component.scss'],
})
export class QuestionsProfileComponent {
	@Input() public questionsResponse!: Observable<IGetQuestionsResponseDTO>;
	@Input() public questionsOnPage!: number;
	@Output() public pageChangedEvent: EventEmitter<number> = new EventEmitter();
	public page$ = new BehaviorSubject<number>(1);

	handlePageChanged(page: number): void {
		this.page$.next(page);
		this.pageChangedEvent.emit(page);
	}
}

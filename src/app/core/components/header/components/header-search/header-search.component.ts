import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catchError } from 'rxjs';
import { HeaderApiService } from '../../services/header-api.service';
import { HeaderStateService } from '../../services/header-state.service';

@Component({
	selector: 'app-header-search',
	templateUrl: './header-search.component.html',
	styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent {
	@Input() expanded = false;
	@Output() expandedChange = new EventEmitter<boolean>();
	dropdownExpanded = false;
	searchResults: ISearchResult[] = [];

	/* Initialize search text from query params */
	constructor(
		private readonly _headerApiService: HeaderApiService,
		public headerState: HeaderStateService
	) {}

	expandCollapse(newState: boolean = this.expanded) {
		this.expanded = !newState;
		this.expandedChange.emit(this.expanded);
		this.dropdownExpanded = this.expanded;
	}

	searchForResults() {
		if (this.headerState.searchText.length < 3) {
			this.searchResults = [];
			this.headerState.searchTextSubmit$.next('');
			return;
		}

		this._headerApiService
			.search$(this.headerState.searchText)
			.pipe(catchError(() => (this.searchResults = [])))
			.subscribe(({ users, universities, questions }) => {
				this.searchResults = [
					...users.map((u) => ({
						type: SearchResultType.USER,
						url: `/public/profile/${u.id}`,
						text: u.nickname,
						formattedText: this.formatResultText(u.nickname),
					})),
					...universities.map((u) => ({
						type: SearchResultType.UNIVERSITY,
						url: `/public/university/${u.id}`,
						text: u.name,
						formattedText: this.formatResultText(u.name),
					})),
					...questions.map((q) => ({
						type: SearchResultType.QUESTION,
						url: `/public/question/details/${q.id}`,
						text: q.header,
						formattedText: this.formatResultText(q.header),
					})),
				] as ISearchResult[];
			});
	}

	formatResultText(rawText: string): string {
		return rawText
			.split(new RegExp(this.headerState.searchText, 'i'))
			.join(`<strong>${this.headerState.searchText}</strong>`);
	}

	afterResultClick() {
		this.dropdownExpanded = false;
		this.headerState.searchText = '';
		this.searchForResults();
	}

	showMoreQuestions() {
		this.headerState.searchTextSubmit$.next(this.headerState.searchText);
	}
}

export interface ISearchResult {
	type: SearchResultType;
	url: string;
	text: string;
	formattedText: string;
}

export enum SearchResultType {
	QUESTION = 'Pytanie',
	USER = 'Użytkownik',
	UNIVERSITY = 'Uczelnia',
}

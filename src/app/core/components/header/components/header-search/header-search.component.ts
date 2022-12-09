import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderApiService } from '../../services/header-api.service';

@Component({
	selector: 'app-header-search',
	templateUrl: './header-search.component.html',
	styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent {
	@Input() expanded = false;
	@Output() expandedChange = new EventEmitter<boolean>();
	dropdownExpanded = false;

	constructor(private readonly _headerApiService: HeaderApiService) {}

	expandCollapse(newState: boolean = this.expanded) {
		this.expanded = !newState;
		this.expandedChange.emit(this.expanded);
		this.dropdownExpanded = this.expanded;
	}
}

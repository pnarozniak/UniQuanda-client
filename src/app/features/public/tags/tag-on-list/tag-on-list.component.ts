import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ITag } from 'src/app/shared/models/tag.model';

@Component({
	selector: 'app-tag-on-list',
	templateUrl: './tag-on-list.component.html',
	styleUrls: ['./tag-on-list.component.scss'],
})
export class TagOnListComponent {
	@Input() tag!: ITag;
	@Input() parentTagId: number | null = null;
	@Output() tagClick = new EventEmitter<ITag>();

	@Input() destoryListener!: Observable<boolean>;
	public isLoading = true;
}

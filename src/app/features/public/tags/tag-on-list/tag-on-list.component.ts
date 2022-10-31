import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITag } from '../models/get-tags.dto';

@Component({
	selector: 'app-tag-on-list',
	templateUrl: './tag-on-list.component.html',
	styleUrls: ['./tag-on-list.component.scss'],
})
export class TagOnListComponent {
	@Input() tag!: ITag;
	@Input() parentTagId: number | null = null;
	@Output() tagClick = new EventEmitter<ITag>();
	public isLoading = true;
}

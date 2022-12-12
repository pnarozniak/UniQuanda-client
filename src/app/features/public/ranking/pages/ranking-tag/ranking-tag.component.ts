import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITag } from 'src/app/shared/models/tag.model';
import { IGetRankingResponseDTO } from '../../models/get-ranking.model';
import { TagNamesApiSerive } from '../../services/tag-names.api.service';

@Component({
	selector: 'app-ranking-tag',
	templateUrl: './ranking-tag.component.html',
	styleUrls: ['./ranking-tag.component.scss'],
})
export class RankingTagComponent implements OnInit {
	ngOnInit(): void {
		if (this.initalTagId) {
			this.initialTags$ = this._tagNamesApiService.getTagNames([
				this.initalTagId,
			]);
		}
	}

	constructor(private readonly _tagNamesApiService: TagNamesApiSerive) {}
	@Input() public response$!: Observable<IGetRankingResponseDTO>;
	@Input() public initalTagId: number | null = null;
	@Output() public pageChangedEvent: EventEmitter<number> = new EventEmitter();
	@Output() public tagChangedEvent: EventEmitter<number | null> =
		new EventEmitter();

	public initialTags$ = new Observable<ITag[]>();
	public tagControl = new FormControl('');
	public readonly _pageSize = 10;
	public page$ = new BehaviorSubject<number>(1);

	handlePageChanged(page: number): void {
		this.page$.next(page);
		this.pageChangedEvent.emit(page);
	}

	handleTagsChanged(tags: ITag[]): void {
		if (tags.length === 0) {
			this.initalTagId = null;
			this.tagChangedEvent.emit(null);
			return;
		}

		const tag = tags[0];
		this.initalTagId = tag.id;
		this.page$.next(1);
		this.tagChangedEvent.emit(tag.id);
	}
}

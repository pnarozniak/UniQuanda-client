import { Component } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { tap, Observable, of, map } from 'rxjs';
import { GetTagsRequestDto, ITag } from '../../models/get-tags.dto';

@Component({
	selector: 'app-question-chips',
	templateUrl: './question-chips.component.html',
	styleUrls: ['./question-chips.component.scss'],
})
export class QuestionChipsComponent {
	separatorKeysCodes: number[] = [ENTER, COMMA];
	tagCtrl = new FormControl('');
	suggestedTags: Observable<string[]> = of([]);
	selectedTags: ITag[] = [];
	possibleTags: ITag[] = [];

	constructor(private readonly _tagService: TagsService) {
		this.tagCtrl.valueChanges.subscribe((keyword: string | null) => {
			if (keyword) {
				this._tagService
					.getTags(new GetTagsRequestDto(keyword))
					.pipe(
						tap((response) => {
							response.tags.forEach((tag) => {
								if (!this.possibleTags.some((ptag) => ptag.id === tag.id)) {
									this.possibleTags.push(tag);
								}
							});
						})
					)
					.pipe(
						map((response) => {
							return response.tags.map((tag) => tag.name);
						})
					);
			} else {
				this.suggestedTags = of(
					this.possibleTags.slice(0, 10).map((tag) => tag.name)
				);
			}
		});
	}
}

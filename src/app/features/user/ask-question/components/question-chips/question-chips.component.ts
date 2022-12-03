import { Component, ElementRef, ViewChild } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { tap, Observable, of, map } from 'rxjs';
import { GetTagsRequestDto, ITag } from '../../models/get-tags.dto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
	selector: 'app-question-chips',
	templateUrl: './question-chips.component.html',
	styleUrls: ['./question-chips.component.scss'],
})
export class QuestionChipsComponent {
	separatorKeysCodes: number[] = [ENTER, COMMA];
	tagCtrl = new FormControl('');
	suggestedTags: Observable<ITag[]> = of([]);
	selectedTags: ITag[] = [];
	possibleTags: ITag[] = [];

	@ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

	constructor(private readonly _tagService: TagsService) {
		this.tagCtrl.valueChanges.subscribe((keyword: string | null) => {
			if (keyword) {
				this.suggestedTags = this._tagService
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
					.pipe(map((response) => response.tags));
			} else {
				this.suggestedTags = of(this.possibleTags.slice(0, 10));
			}
		});
	}

	removeTag(tag: ITag) {
		this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id);
	}

	addTag(event: MatChipInputEvent) {
		const value = (event.value || '').trim();
		if (value) {
			const tag = this.possibleTags.find((t) => t.name === value);
			if (tag && !this.selectedTags.some((t) => t.id === tag.id)) {
				this.selectedTags.push(tag);
				this.tagInput.nativeElement.value = '';
			}
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		const tag = this.possibleTags.find((t) => t.id === event.option.value);
		if (tag && !this.selectedTags.some((t) => t.id === tag.id)) {
			this.selectedTags.push(tag);
		}
		this.tagCtrl.setValue(null);
		this.tagInput.nativeElement.value = '';
	}
}

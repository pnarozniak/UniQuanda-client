import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { TagsApiService } from '../../services/tags-api.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { tap, Observable, of, map, Subscription } from 'rxjs';
import { GetTagsRequestDto, ITag } from '../../models/get-tags.dto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
	selector: 'app-question-chips',
	templateUrl: './question-chips.component.html',
	styleUrls: ['./question-chips.component.scss'],
})
export class QuestionChipsComponent implements OnInit, OnDestroy {
	separatorKeysCodes: number[] = [ENTER, COMMA];
	suggestedTags: Observable<ITag[]> = of([]);
	selectedTags: ITag[] = [];
	possibleTags: ITag[] = [];
	maxTagsAmount = 5;
	private subscription = new Subscription();

	@Input() tagCtrl!: FormControl;

	@Output() selectedTagsEmitter = new EventEmitter<ITag[]>();

	public get isDisabled() {
		return this.selectedTags.length >= this.maxTagsAmount;
	}

	showError = false;

	@ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

	constructor(private readonly _tagApiService: TagsApiService) {}
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	ngOnInit(): void {
		this.subscription.add(
			this.tagCtrl.valueChanges.subscribe((keyword: string | null) => {
				this.showError = false;
				if (keyword) {
					this.suggestedTags = this._tagApiService
						.getTags(new GetTagsRequestDto(keyword))
						.pipe(
							tap((response) => {
								response.tags.forEach((tag) => {
									if (
										!this.possibleTags.some((ptag) => ptag.id === tag.id) && // not already in possible tags
										!this.selectedTags.some((stag) => stag.id === tag.id) // not already in selected tags
									) {
										this.possibleTags.push(tag);
									}
								});
								if (response.tags.length === 0) {
									this.showError = true;
								}
							})
						)
						.pipe(
							map((response) => {
								return response.tags.filter((tag) => {
									return !this.selectedTags.some((stag) => stag.id === tag.id);
								});
							})
						);
				} else {
					this.suggestedTags = of(this.possibleTags.slice(0, 10));
				}
			})
		);
	}

	removeTag(tag: ITag) {
		this.possibleTags.push(tag);
		this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id);
		this.selectedTagsEmitter.emit(this.selectedTags);
	}

	addTag(event: MatChipInputEvent) {
		const value = (event.value || '').trim();
		if (value) {
			const tag = this.possibleTags.find((t) => t.name === value);
			if (tag && !this.selectedTags.some((t) => t.id === tag.id)) {
				this.selectedTags.push(tag);
				this.selectedTagsEmitter.emit(this.selectedTags);
				this.possibleTags = this.possibleTags.filter((t) => t.id !== tag.id);
				this.tagInput.nativeElement.value = '';
			}
		}
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		const tag = this.possibleTags.find((t) => t.id === event.option.value);
		if (tag && !this.selectedTags.some((t) => t.id === tag.id)) {
			this.selectedTags.push(tag);
			this.selectedTagsEmitter.emit(this.selectedTags);
			this.possibleTags = this.possibleTags.filter((t) => t.id !== tag.id);
		}
		this.tagCtrl.setValue(null);
		this.tagInput.nativeElement.value = '';
	}
}

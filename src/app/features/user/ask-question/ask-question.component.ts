import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITag } from './models/get-tags.dto';

@Component({
	selector: 'app-ask-question',
	templateUrl: './ask-question.component.html',
	styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent {
	public form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		content: new FormControl('', [Validators.required]),
		confirmation: new FormControl(false, [Validators.requiredTrue]),
	});

	public tagInput = new FormControl('');
	public tags: ITag[] = [];

	public handleAsk() {
		this.form.markAllAsTouched();
		this.tagInput.markAsTouched();
		this.tagInput.setErrors({ requiredTags: null });
		this.tagInput.updateValueAndValidity();
		if (this.tags.length === 0) {
			this.tagInput.setErrors({ requiredTags: true });
			console.log(this.tagInput);
			return;
		}
		console.log(this.tagInput);

		if (this.form.invalid) return;
		console.log('tytuł', this.form.get('title'));
		console.log('confirmation', this.form.get('confirmation'));
		console.log('tags', this.tags);
		console.log('content', this.form.get('content'));
	}

	public setTags(tags: ITag[]) {
		this.tags = tags;
	}
}

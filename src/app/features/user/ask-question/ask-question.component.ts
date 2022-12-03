import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-ask-question',
	templateUrl: './ask-question.component.html',
	styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent {
	public title = new FormControl('', [Validators.required]);
	public confirmation = new FormControl(false, [Validators.requiredTrue]);
	public tags = [];
	public content = '';

	public handleAsk() {
		this.title.markAllAsTouched();
		this.confirmation.markAllAsTouched();
		console.log('tytuł', this.title.value);
		console.log('confirmation', this.confirmation.value);
		console.log('tags', this.tags);
		console.log('content', this.content);
		console.log('errors', this.confirmation.errors);
	}

	public setContent(content: string) {
		this.content = content;
	}
}

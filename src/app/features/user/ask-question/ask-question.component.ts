import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ITag } from 'src/app/shared/models/tag.model';
import AddQuestionRequestDTO from './models/add-question.dto';
import AskQuestionApiService from './services/ask-question-api.service';

@Component({
	selector: 'app-ask-question',
	templateUrl: './ask-question.component.html',
	styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent {
	public form = new FormGroup({
		title: new FormControl('', [
			Validators.required,
			Validators.minLength(5),
			Validators.maxLength(100),
		]),
		content: new FormControl('', [Validators.required]),
		confirmation: new FormControl(false, [Validators.requiredTrue]),
	});
	public maxTagsAmount = 5;

	public constructor(
		private readonly _askQuestionApiService: AskQuestionApiService,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService,
		private readonly _loaderService: LoaderService
	) {}

	public tagInput = new FormControl('');
	public tags: ITag[] = [];

	public handleAsk() {
		this.form.markAllAsTouched();
		this.tagInput.markAsTouched();
		this.tagInput.setErrors({ requiredTags: null });
		this.tagInput.updateValueAndValidity();
		if (this.tags.length === 0) {
			this.tagInput.setErrors({ requiredTags: true });
			return;
		}
		if (this.form.invalid) return;
		this._loaderService.show();
		const value = this.form.value;
		const request = new AddQuestionRequestDTO(
			value.content,
			this.tags.map((t) => t.id),
			value.title,
			value.confirmation
		);
		this._askQuestionApiService.addQuestion(request).subscribe({
			next: (questionId) => {
				this._toastrService.success(
					'Pomyślnie zadano pytanie',
					'Dodano pytanie'
				);
				this._loaderService.hide();
				this._router.navigate(['public/question/details', questionId]);
			},
		});
	}

	public setTags(tags: ITag[]) {
		this.tags = tags;
	}
}

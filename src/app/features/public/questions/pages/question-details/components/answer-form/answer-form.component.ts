import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnswersApiService } from '../../services/answers-api.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IAddAnswerRequestDTO } from '../../models/add-answer.dto';
import { LoaderService } from 'src/app/core/services/loader.service';
import { finalize } from 'rxjs';
import { AnswerFormMode } from '../../enums/answer-form-mode.enum';
import { IUpdateAnswerRequestDTO } from '../../models/update-answer.dto';

@Component({
	selector: 'app-answer-form',
	templateUrl: './answer-form.component.html',
	styleUrls: ['./answer-form.component.scss'],
})
export class AnswerFormComponent implements OnInit {
	@Input() idQuestion!: number;
	@Input() answerId: number | null = null;
	@Input() parentAnswerId: number | null = null;
	@Input() htmlContet = '';
	@Input() answerEditFormMode: AnswerFormMode = AnswerFormMode.DisplayMode;
	@Input() isEditMode!: boolean;
	@Input() page = 1;
	@Input() customId = '';

	@Output() isEditModeChange = new EventEmitter<boolean>();

	public contentControl = new FormControl('', [Validators.required]);
	public enumAnswerFormMode = AnswerFormMode;

	constructor(
		private readonly _answersApiService: AnswersApiService,
		private readonly _toastr: ToastrService,
		private readonly _loader: LoaderService,
		private readonly _router: Router
	) {
		this._router.routeReuseStrategy.shouldReuseRoute = () => false;
	}

	ngOnInit(): void {
		if (this.isEditMode) {
			const el = document.getElementById(`form${this.customId}`);
			el?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
		this.contentControl.setValue(this.htmlContet);
	}

	changeIsEditMode(): void {
		this.isEditMode = !this.isEditMode;
		this.isEditModeChange.emit(this.isEditMode);
	}

	addAnswer(): void {
		this.contentControl.markAllAsTouched();
		if (this.contentControl.invalid) return;

		this._loader.show();
		const request: IAddAnswerRequestDTO = {
			idQuestion: this.idQuestion,
			rawText: this.contentControl.value,
			parentAnswerId: this.parentAnswerId,
		};
		this._answersApiService
			.addAnswer(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: (res) => {
					this._toastr.success('Pomyślnie dodano odpowiedź', 'Sukces');
					const pageAnswer = res.body?.page ?? 1;
					if (pageAnswer === this.page) {
						const currentUrl = this._router.url;
						const splittedUrl = currentUrl.split('?');

						this._router.navigate([splittedUrl[0]], {
							queryParams: {
								page: pageAnswer,
								item: res.body?.idAnswer,
								comment: res.body?.idComment,
							},
						});

						// const currentUrl = this._router.url;
						// const splittedUrl = currentUrl.split('?');
						// this._router
						// 	.navigateByUrl(splittedUrl[0], { skipLocationChange: true })
						// 	.then(() =>
						// 		this._router.navigate([splittedUrl[0]], {
						// 			queryParams: {
						// 				page: splittedUrl[1].split('&')[0].split('=')[1],
						// 				item: res.body?.idAnswer,
						// 				comment: res.body?.idComment,
						// 			},
						// 		})
						// 	);
					} else {
						// this._router
						// 	.navigateByUrl('/', { skipLocationChange: true })
						// 	.then(() => {
						this._router.navigate([`/public/questions/${this.idQuestion}`], {
							queryParams: {
								page: pageAnswer,
								item: res.body?.idAnswer,
								comment: res.body?.idComment,
							},
						});
						// });
					}
				},
				error: (err) => {
					if (err.status === 409)
						this._toastr.success('Spróbuj ponownie za chwilę', 'Błąd');
				},
			});
	}

	updateAnswer(): void {
		this.contentControl.markAllAsTouched();
		if (this.contentControl.invalid) return;

		this._loader.show();
		const request: IUpdateAnswerRequestDTO = {
			idAnswer: this.answerId!,
			rawText: this.contentControl.value,
		};
		this._answersApiService
			.updateAnswer(request)
			.pipe(finalize(() => this._loader.hide()))
			.subscribe({
				next: () => {
					this.isEditModeChange.emit(false);
					this._toastr.success('Pomyślnie dodano odpowiedź', 'Sukces');
				},
				error: (err) => {
					if (err.status === 409)
						this._toastr.success('Spróbuj ponownie za chwilę', 'Błąd');
				},
			});
	}
}

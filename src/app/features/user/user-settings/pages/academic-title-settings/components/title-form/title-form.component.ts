import { E } from '@angular/cdk/keycodes';
import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IAcademicTitleOfUser } from '../../models/academic-title-of-user.dto';
import { IAcademicTitle } from '../../models/academic-title.dto';

@Component({
	selector: 'app-title-form',
	templateUrl: './title-form.component.html',
	styleUrls: ['./title-form.component.scss'],
})
export class TitleFormComponent {
	public scan: File | null = null;
	public isScanInvalid = false;
	public form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		additionalInfo: new FormControl('', [Validators.maxLength(2000)]),
	});
	@Input() public avilableTitles!: Observable<IAcademicTitle[]>;
	@Input() public userTitles!: Observable<IAcademicTitleOfUser[]>;
	@Output() public formData = new EventEmitter<FormData>();
	@ViewChild('fileInput') fileInput!: ElementRef;

	handleSubmit(): void {
		this.form.markAllAsTouched();
		this.isScanInvalid = false;
		let isAllInvalid = false;
		if (this.form.invalid) isAllInvalid = true;
		if (!this.scan) {
			isAllInvalid = true;
			this.isScanInvalid = true;
			return;
		}
		if (isAllInvalid) return;
		const formDataObj = new FormData();
		formDataObj.append('academicTitleId', this.form.value.title);
		formDataObj.append('additionalInfo', this.form.value.additionalInfo);
		formDataObj.append('scan', this.scan);
		this.formData.emit(formDataObj);
		this.form.reset();
		this.scan = null;
	}

	handleScanChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0] as File;
		if (!file) {
			this.scan = null;
			this.isScanInvalid = true;
			return;
		}
		this.scan = file;
		this.isScanInvalid = false;
	}
	handleFakeFileClick() {
		this.fileInput.nativeElement.click();
	}

	handleRemoveFile() {
		this.scan = null;
		this.isScanInvalid = true;
	}

	public get isAdditionalInfoInvalid(): boolean {
		return (
			(this.form.get('additionalInfo')?.invalid &&
				this.form.get('additionalInfo')?.touched) ??
			false
		);
	}

	public get titleControl(): FormControl {
		return this.form.get('title') as FormControl;
	}

	public showInfoBox(
		userTitles: IAcademicTitleOfUser[],
		avilableTitles: IAcademicTitle[]
	): boolean {
		const selectedTitlteName = this.form.get('title')?.value;
		const title = avilableTitles.find((t) => t.name === selectedTitlteName);
		if (!title) return false;
		return userTitles.find((t) => t.type === title.type) !== undefined;
	}

	public getCurentTitleNameWithSameType(
		userTitles: IAcademicTitleOfUser[],
		avilableTitles: IAcademicTitle[]
	): string {
		const selectedTitlteName = this.form.get('title')?.value;
		const selectedTitle = avilableTitles.find(
			(t) => t.name === selectedTitlteName
		);
		return userTitles.find((t) => t.type === selectedTitle!.type)?.name ?? '';
	}
}

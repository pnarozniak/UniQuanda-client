import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';

@Component({
	selector: 'app-content-form',
	templateUrl: './content-form.component.html',
	styleUrls: ['./content-form.component.scss'],
})
export class ContentFormComponent {
	public editor = Editor;
	public config = {
		toolbar: {
			shouldNotGroupWhenFull: true,
		},
	};

	public model = '';
	public editMode = true;
	public blockEnabled = true;

	// controll from parent component that contains initial value
	@Input()
	public control!: AbstractControl;
	// is enabled editing
	@Input() set isEditMode(value: boolean) {
		this.editMode = value;
		if (!value) {
			if (this.blockEnabled) {
				this.model = this.control.value;
			} else {
				this.model = this.filterHtml(this.control.value);
			}
		} else {
			this.model = this.control.value;
			this.blockEnabled = true;
		}
	}
	// if isEditMode is false, then decide if show blocks or not
	@Input() public set showBlocks(value: boolean) {
		this.blockEnabled = value;
		this.model = value
			? this.control.value
			: this.filterHtml(this.control.value);
		if (!this.blockEnabled) this.editMode = false;
	}
	public setValue({ editor }: ChangeEvent) {
		if (this.blockEnabled) {
			try {
				this.control.setValue(editor.getData());
			} catch {} // oh no, I'm so sorry
		}
	}

	private filterHtml(html: string): string {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const selectorsToRemove = [
			'blockquote',
			'ul',
			'ol',
			'figure',
			'pre',
			'.math-tex',
		];
		selectorsToRemove.forEach((selector) => {
			const elements = doc.querySelectorAll(selector);
			elements.forEach((element) => {
				element.remove();
			});
		});
		// get first childs as string
		const firstChildText = doc.body.firstChild?.textContent;
		// get second child as string
		const secondChildText = doc.body.firstChild?.nextSibling?.textContent;
		if (
			(!firstChildText || firstChildText === '' || firstChildText === ' ') &&
			(!secondChildText || secondChildText === '' || secondChildText === ' ')
		)
			return 'Wejdź w szczegóły pytania aby zapoznać się z treścią';
		if (!secondChildText || secondChildText === '' || secondChildText === ' ')
			return `${firstChildText}...`;
		return `${firstChildText}<br/>${secondChildText}...`;
	}
}

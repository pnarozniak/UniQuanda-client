import { Component, EventEmitter, Input, Output } from '@angular/core';
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

	@Input()
	public model = '';

	@Output()
	public modelChange = new EventEmitter<string>();

	public emitChange({ editor }: ChangeEvent) {
		this.modelChange.emit(editor.getData());
	}
}

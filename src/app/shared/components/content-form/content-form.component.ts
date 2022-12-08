import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';

@Component({
	selector: 'app-content-form',
	templateUrl: './content-form.component.html',
	styleUrls: ['./content-form.component.scss'],
})
export class ContentFormComponent implements OnInit {
	ngOnInit(): void {
		this.model = this.control.value;
	}
	public editor = Editor;
	public config = {
		toolbar: {
			shouldNotGroupWhenFull: true,
		},
	};

	public model = '';

	@Input()
	public control!: AbstractControl;

	public setValue({ editor }: ChangeEvent) {
		try {
			this.control.setValue(editor.getData());
		} catch {} // oh no, I'm so sorry
	}
}

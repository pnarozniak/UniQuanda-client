import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ITag } from 'src/app/shared/models/tag.model';

@Component({
	selector: 'app-right-menu-generate-test',
	templateUrl: './right-menu-generate-test.component.html',
	styleUrls: ['./right-menu-generate-test.component.scss'],
})
export class RightMenuGenerateTestComponent {
	control = new FormControl('');
	selectedTags: ITag[] = [];

	constructor(private router: Router) {}

	generateTest() {
		this.control.setErrors(
			this.selectedTags.length === 0 ? { required: true } : null
		);
		if (this.control.invalid) return;

		this.router.navigate(['/user/test/automatic'], {
			state: { tags: this.selectedTags },
		});
	}
}

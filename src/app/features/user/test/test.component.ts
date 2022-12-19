import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ITag } from 'src/app/shared/models/tag.model';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss'],
})
export class TestComponent {
	tagsControl = new FormControl('');
	selectedTags: ITag[] = [];

	constructor(private router: Router) {}

	generateTest() {
		this.tagsControl.setErrors(
			this.selectedTags.length === 0 ? { required: true } : null
		);
		if (this.tagsControl.invalid) return;

		this.router.navigate(['/user/test/automatic'], {
			queryParams: {
				tagIds: this.selectedTags.map((t) => t.id).join(','),
			},
		});
	}
}

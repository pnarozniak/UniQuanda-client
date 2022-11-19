import { Observable, of } from 'rxjs';
import { AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

@Component({
	selector: 'app-auto-complete',
	templateUrl: './auto-complete.component.html',
	styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
	@Input() label = '';
	@Input() control!: AbstractControl;
	@Input() type = 'text';
	@Input() showRequiredMarker = false;
	@Input() errors: { name: string | null; message: string }[] = [];
	@Input() options: string[] = [];

	filteredOptions: Observable<string[]> = of([]);

	get formControl() {
		return this.control as FormControl;
	}

	ngOnInit() {
		this.filteredOptions = this.control.valueChanges.pipe(
			startWith(''),
			map((value) => this.filter(value || ''))
		);
	}

	private filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.options.filter((option) =>
			option.toLowerCase().includes(filterValue)
		);
	}
}

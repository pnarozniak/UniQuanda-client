import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['../input/input.component.scss'],
})
export class DatePickerComponent implements OnInit, OnDestroy {
	@Input() label = '';
	@Input() hint = 'DD-MM-RRRR';
	@Input() control!: AbstractControl;
	@Input() showRequiredMarker = false;
	@Input() errors: { name: string | null; message: string }[] = [];
	@Input() disableFutureDates = false;
	subscription = new Subscription();

	ngOnInit(): void {
		this.subscription.add(this.subscribeToValueChange());
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	subscribeToValueChange = () =>
		this.control.valueChanges.subscribe(() => {
			const raw = this.control.errors?.['matDatepickerParse'];
			if (raw?.text === '' && !this.control.hasValidator(Validators.required)) {
				this.control.setErrors(null);
			}
		});

	get formControl() {
		return this.control as FormControl;
	}

	get currentDate() {
		return new Date();
	}
}

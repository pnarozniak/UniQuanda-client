import { NativeDateAdapter } from '@angular/material/core';

export class PLDatePickerAdapter extends NativeDateAdapter {
	override format(date: Date, displayFormat: any): string {
		const days = date.getDate();
		const months = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${days}-${months}-${year}`;
	}

	override parse(value: any): Date | null {
		const values = value.split('-');
		const date = `${values[1]}-${values[0]}-${values[2]}`;
		return new Date(date);
	}
}

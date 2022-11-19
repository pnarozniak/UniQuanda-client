import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-email-text',
	templateUrl: './email-text.component.html',
	styleUrls: ['./email-text.component.scss'],
})
export class EmailTextComponent {
	@Input() emailTitle: string | undefined;
	@Input() emailValue: string | undefined;
	@Input() icon: string | undefined;

	@Output() iconClick: EventEmitter<void> = new EventEmitter();

	onClick(): void {
		this.iconClick.emit();
	}
}

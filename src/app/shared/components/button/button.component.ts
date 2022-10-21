import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() mode: 'button' | 'submit' = 'button';
	@Input() color: 'none' | 'blue' | 'purple' | 'gray' = 'blue';
	@Input() shape: 'round' | 'rect' = 'round';

	@HostBinding('class') get buttonClasses() {
		return [this.color, this.shape].map((c) => `app-button-${c}`).join(' ');
	}
}

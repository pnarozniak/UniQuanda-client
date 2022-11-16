import {
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() mode: 'button' | 'submit' = 'button';
	@Input() color: 'none' | 'blue' | 'purple' | 'gray' = 'blue';
	@Input() shape: 'round' | 'rect' = 'round';
	@ViewChild('buttonRef') buttonRef?: ElementRef;
	@Input() disabled: boolean = false;

	@HostBinding('class') get buttonClasses() {
		return [this.color, this.shape, this.disabled ? 'disabled' : 'enabled'].map((c) => `app-button-${c}`).join(' ');
	}

	@HostListener('click')
	onClick() {
		if(!this.disabled) {
			this.buttonRef?.nativeElement.click();
		}
	}
}

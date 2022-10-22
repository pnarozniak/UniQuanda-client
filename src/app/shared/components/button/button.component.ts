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

	@HostBinding('class') get buttonClasses() {
		return [this.color, this.shape].map((c) => `app-button-${c}`).join(' ');
	}

	@HostListener('click')
	onClick() {
		this.buttonRef?.nativeElement.click();
	}
}

import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output,
} from '@angular/core';

@Directive({
	selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
	@Output() clickOutside = new EventEmitter<void>();

	constructor(private elementRef: ElementRef) {}

	@HostListener('document:click', ['$event.target'])
	public onClick(target: HTMLElement) {
		const clickedOutside = !this.elementRef.nativeElement.contains(target);
		if (clickedOutside) {
			this.clickOutside.emit();
		}
	}
}

import {
	Directive,
	ElementRef,
	HostBinding,
	Input,
	OnChanges,
	Renderer2,
	SimpleChanges,
} from '@angular/core';

@Directive({
	selector: '[appLoading]',
})
export class LoadingDirective implements OnChanges {
	private readonly _loadingClassName = 'loading';
	@Input() appLoading = false;
	@HostBinding('class')
	public loadingClass = this._loadingClassName;
	private imageRef!: any;

	constructor(
		private readonly _el: ElementRef,
		private readonly _renderer: Renderer2
	) {
		this.loadingClass = this.appLoading ? this._loadingClassName : '';
	}

	ngAfterViewInit() {
		this.imageRef = this._el.nativeElement.querySelector('img');
		if (this.imageRef !== undefined && this.imageRef !== null) {
			if (this.appLoading) {
				this._renderer.addClass(this.imageRef, 'd-none');
			} else {
				this._renderer.removeClass(this.imageRef, 'd-none');
			}
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.loadingClass = this.appLoading ? this._loadingClassName : '';
		if (this.imageRef !== undefined && this.imageRef !== null) {
			if (this.appLoading) {
				this._renderer.addClass(this.imageRef, 'd-none');
			} else {
				this._renderer.removeClass(this.imageRef, 'd-none');
			}
		}
	}
}

import {
	AfterViewInit,
	Directive,
	ElementRef,
	HostBinding,
	Input,
	OnChanges,
	OnInit,
	Renderer2,
	SimpleChanges,
} from '@angular/core';

@Directive({
	selector: '[appLoading]',
})
export class LoadingDirective implements OnChanges, OnInit {
	private readonly _loadingClassName = 'loading';
	@Input() appLoading = false;
	@HostBinding('class')
	public loadingClass = '';

	private imageRef!: any;
	private interval: any = null;

	constructor(
		private readonly _el: ElementRef,
		private readonly _renderer: Renderer2
	) {}

	ngOnInit() {
		this.imageRef = this._el.nativeElement.querySelector('img');
		if (this.appLoading) {
			if (this.imageRef !== undefined && this.imageRef !== null) {
				this._renderer.addClass(this.imageRef, 'd-none');
			}
			this.addInterval();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		clearTimeout(this.interval);
		if (this.appLoading) {
			this.addInterval();
		} else {
			this.loadingClass = '';
			if (this.imageRef !== undefined && this.imageRef !== null) {
				this._renderer.removeClass(this.imageRef, 'd-none');
			}
		}
	}

	private addInterval() {
		this.interval = setTimeout(() => {
			if (this.appLoading) {
				this.loadingClass = this._loadingClassName;
				if (
					this.imageRef !== undefined &&
					this.imageRef !== null &&
					this.appLoading
				) {
					this._renderer.addClass(this.imageRef, 'd-none');
				}
			}
		}, 500);
	}
}

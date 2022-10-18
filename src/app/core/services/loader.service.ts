import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	private readonly _overlayRef = this._overlay.create();

	constructor(private readonly _overlay: Overlay) {}

	/**
	 * Shows loader
	 */
	show() {
		if (!this._overlayRef.hasAttached()) {
			this._overlayRef.attach(new ComponentPortal(LoaderComponent));
		}
	}

	/**
	 * Shows loader
	 */
	hide() {
		this._overlayRef.detach();
	}
}

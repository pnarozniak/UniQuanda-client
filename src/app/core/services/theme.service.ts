import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { UserDataService } from './user-data.service';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly _isDarkStorageKey = 'is_dark_theme';
	private readonly _isDark$ = new BehaviorSubject<boolean>(false);

	constructor(
		private readonly _userDataService: UserDataService,
		private readonly _storageService: StorageService,
		private readonly _toastrService: ToastrService
	) {
		this.loadInitialState();
	}

	/**
	 * Changes currnet theme to oposite: light->dark or dark->light
	 */
	toggleTheme(): void {
		const nextValue = !this._isDark$.getValue();
		this._isDark$.next(nextValue);
		this._storageService.save(this._isDarkStorageKey, nextValue);
		this.updateToastrTheme(nextValue);
	}

	/**
	 * Creates observable instace for current theme
	 * @returns Observable with value: True if theme is dark, otherwise False
	 */
	isDark$(): Observable<boolean> {
		return this._isDark$.asObservable();
	}

	private updateToastrTheme(isDark: boolean) {
		this._toastrService.toastrConfig.toastClass = `ngx-toastr ${
			isDark ? 'dark' : 'light'
		}`;
	}

	private loadInitialState() {
		this._userDataService.getUserData$().subscribe((user) => {
			const isThemeDark = this._storageService.get<boolean>(
				this._isDarkStorageKey
			);
			const isDark = user ? isThemeDark ?? false : false;
			this._isDark$.next(isDark);
			this.updateToastrTheme(isDark);
		});
	}
}

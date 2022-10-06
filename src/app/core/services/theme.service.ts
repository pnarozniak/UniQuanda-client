import { Injectable } from '@angular/core';
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
		private readonly _storageService: StorageService
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
	}

	/**
	 * Creates observable instace for current theme
	 * @returns Observable with value: True if theme is dark, otherwise False
	 */
	isDark$(): Observable<boolean> {
		return this._isDark$.asObservable();
	}

	private loadInitialState() {
		this._userDataService.getUserData$().subscribe((user) => {
			const isThemeDark = this._storageService.get<boolean>(
				this._isDarkStorageKey
			);
			this._isDark$.next(user ? isThemeDark ?? false : false);
		});
	}
}

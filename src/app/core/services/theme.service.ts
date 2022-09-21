import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private readonly _isDarkStorageKey = 'is_dark_theme';
	private readonly _isDark$ = new BehaviorSubject<boolean>(false);

	constructor(private readonly _storageService: StorageService) {
		const isThemeDark = _storageService.get<boolean>(this._isDarkStorageKey);
		this._isDark$.next(isThemeDark ?? false);
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
	 * Checks wheter current theme is dark
	 * @returns True if theme is dark, otherwise False
	 */
	isDark(): boolean {
		return this._isDark$.value;
	}

	/**
	 * Creates observable instace for current theme
	 * @returns Observable with value: True if theme is dark, otherwise False
	 */
	isDark$(): Observable<boolean> {
		return this._isDark$.asObservable();
	}
}

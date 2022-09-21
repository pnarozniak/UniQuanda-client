import { Injectable } from '@angular/core';
@Injectable()
export class StorageService {
	/**
	 * Saves item under given key in storage
	 * @param key item key
	 * @param item item to be saved in storage
	 */
	save<T>(key: string, item: T): void {
		localStorage.setItem(key, JSON.stringify(item));
	}

	/**
	 * Gets item under given key from storage
	 * @param key item key
	 * @returns item or null if not found
	 */
	get<T>(key: string): T | null {
		const value = localStorage.getItem(key);
		if (!value) return null;

		return JSON.parse(value) as T;
	}

	/**
	 * Removes item with given key from storage
	 * @param key item key
	 */
	delete(key: string): void {
		localStorage.removeItem(key);
	}
}

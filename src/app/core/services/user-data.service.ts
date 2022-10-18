import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { IUserClaims } from '../models/user-claims.model';
import { StorageService } from './storage.service';

@Injectable()
export class UserDataService {
	private readonly _userStorageKey = 'user';
	private readonly _idKey =
		'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
	private readonly _rolesKey =
		'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
	private readonly _user$ = new BehaviorSubject<IUserClaims | null>(null);

	constructor(private readonly _storageService: StorageService) {
		this.loadInitialState();
	}

	/**
	 * Sets user data, including accessToken claims
	 * @param nickname user nickname
	 * @param avatar user avatar
	 * @param accessToken user accessToken
	 * @param refreshToken user refreshToken
	 */
	setUserData(
		nickname: string,
		avatar: string,
		accessToken: string,
		refreshToken: string
	): void {
		const decoded = this.decodeAccessToken(accessToken);
		const userData = {
			id: decoded.id,
			roles: decoded.roles,
			nickname,
			avatar,
			accessToken,
			refreshToken,
		};
		this._user$.next(userData);
		this._storageService.save(this._userStorageKey, userData);
	}

	/**
	 * Removes all user data
	 */
	clearUserData(): void {
		this._user$.next(null);
		this._storageService.delete(this._userStorageKey);
	}

	/**
	 * Gets current user data
	 * @returns Current user claims or null
	 */
	getUserData(): IUserClaims | null {
		return this._user$.getValue();
	}

	/**
	 * Creates observable instace for user data
	 * @returns Observable with value: user claims or null
	 */
	getUserData$(): Observable<IUserClaims | null> {
		return this._user$.asObservable();
	}

	setAvatar(avatarUrl: string): void {
		this._storageService.save('avatar', avatarUrl);
		this.loadInitialState();
	}

	private decodeAccessToken(token: string): { id: number; roles: Role[] } {
		const decoded = JSON.parse(window.atob(token.split('.')[1]));
		return {
			id: Number(decoded[this._idKey]),
			roles: decoded[this._rolesKey],
		};
	}

	private loadInitialState() {
		const user = this._storageService.get<IUserClaims>(this._userStorageKey);
		if (user) this._user$.next(user);
	}
}

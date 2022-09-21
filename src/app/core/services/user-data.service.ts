import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../enums/role.enum';
import { IUserClaims } from '../models/user-claims.model';
import { StorageService } from './storage.service';

@Injectable()
export class UserDataService {
	private readonly _userStorageKey = 'user';
	private readonly _user$ = new BehaviorSubject<IUserClaims | null>(null);

	constructor(private readonly _storageService: StorageService) {
		this.loadInitialState();
	}

	setUserData(
		nickname: string,
		avatar: string,
		accessToken: string,
		refreshToken: string
	): void {
		const decoded = this.decodeAccessToken(accessToken);
		this._user$.next({
			id: decoded.id,
			roles: decoded.roles,
			nickname,
			avatar,
			accessToken,
			refreshToken,
		});
		this._storageService.save(this._userStorageKey, decoded);
	}

	clearUserData(): void {
		this._user$.next(null);
		this._storageService.delete(this._userStorageKey);
	}

	getUserData(): IUserClaims | null {
		return this._user$.getValue();
	}

	getUserData$(): Observable<IUserClaims | null> {
		return this._user$.asObservable();
	}

	private decodeAccessToken(token: string): { id: number; roles: Role[] } {
		const decoded = JSON.parse(window.atob(token.split('.')[1]));
		return {
			id: decoded.id,
			roles: decoded.roles,
		};
	}

	private loadInitialState() {
		const user = this._storageService.get<IUserClaims>(this._userStorageKey);
		if (user) this._user$.next(user);
	}
}

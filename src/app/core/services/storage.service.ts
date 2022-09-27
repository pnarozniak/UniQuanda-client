import { Injectable } from '@angular/core';
import { UserClaims } from '../models/user-claims.model';

@Injectable()
export class StorageService {
	private readonly _accessTokenKey = 'access_token';
	private readonly _refreshTokenKey = 'refresh_token';
	private readonly _avatarKey = 'avatar';
	private readonly _nicknameKey = 'nickname';
	private readonly _idJwtKey =
		'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
	private readonly _roleJwtKey =
		'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

	getAccessToken(): string | null {
		return localStorage.getItem(this._accessTokenKey);
	}

	saveUserData(
		accessToken: string,
		refreshToken: string,
		nickname: string,
		avatar: string
	): void {
		localStorage.setItem(this._accessTokenKey, accessToken);
		localStorage.setItem(this._refreshTokenKey, refreshToken);
		localStorage.setItem(this._nicknameKey, nickname);
		localStorage.setItem(this._avatarKey, avatar);
	}

	getRefreshToken(): string | null {
		return localStorage.getItem(this._refreshTokenKey);
	}

	getNickname(): string | null {
		return localStorage.getItem(this._nicknameKey);
	}

	getAvatar(): string | null {
		return localStorage.getItem(this._avatarKey);
	}

	setAvatar(avatarUrl: string | null): void {
		if (avatarUrl) localStorage.setItem(this._avatarKey, avatarUrl);
		else localStorage.removeItem(this._avatarKey);
	}

	saveRefreshToken(refreshToken: string): void {
		localStorage.setItem(this._refreshTokenKey, refreshToken);
	}

	removeAccessToken(): void {
		localStorage.removeItem(this._accessTokenKey);
	}

	removeRefreshToken(): void {
		localStorage.removeItem(this._refreshTokenKey);
	}

	getUserClaims(): UserClaims | null {
		try {
			const jwt = this.getAccessToken();
			const nickname = this.getNickname();
			const avatar = this.getAvatar();
			if (!jwt) return null;
			const decodedJWT = JSON.parse(window.atob(jwt!.split('.')[1]));
			return new UserClaims(
				decodedJWT[this._idJwtKey],
				decodedJWT[this._roleJwtKey],
				nickname ?? '',
				avatar ?? ''
			);
		} catch {
			return null;
		}
	}
}

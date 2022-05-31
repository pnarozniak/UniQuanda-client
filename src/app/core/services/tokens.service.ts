import { Injectable } from '@angular/core';
import { UserClaims } from '../models/user-claims.model';

@Injectable()
export class TokensService {
	private readonly _accessTokenKey = 'access_token';
	private readonly _refreshTokenKey = 'refresh_token';

	getAccessToken(): string | null {
		return localStorage.getItem(this._accessTokenKey);
	}

	getRefreshToken(): string | null {
		return localStorage.getItem(this._refreshTokenKey);
	}

	setAccessToken(accessToken: string | null): void {
		if (accessToken) {
			localStorage.setItem(this._accessTokenKey, accessToken);
		} else {
			localStorage.removeItem(this._accessTokenKey);
		}
	}

	setRefreshToken(refreshToken: string | null): void {
		if (refreshToken) {
			localStorage.setItem(this._refreshTokenKey, refreshToken);
		} else {
			localStorage.removeItem(this._refreshTokenKey);
		}
	}

	getClaimsFromJWT(jwt: string): UserClaims | null {
		try {
			const decodedJWT = JSON.parse(window.atob(jwt.split('.')[1]));
			return new UserClaims(decodedJWT.id, decodedJWT.roles);
		} catch {
			return null;
		}
	}
}

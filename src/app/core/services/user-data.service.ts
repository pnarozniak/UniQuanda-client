import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserClaims } from '../models/user-claims.model';
import { TokensService } from './tokens.service';

@Injectable()
export class UserDataService {
	private readonly _user$ = new BehaviorSubject<UserClaims | null>(null);

	constructor(private readonly _tokensService: TokensService) {
		this.setInitialUserData();
	}

	setUserData(user: UserClaims | null): void {
		this._user$.next(user);
	}

	getUserData$(): BehaviorSubject<UserClaims | null> {
		return this._user$;
	}

	getUserData(): UserClaims | null {
		return this._user$.getValue();
	}

	private setInitialUserData() {
		const accessToken = this._tokensService.getAccessToken();
		if (!accessToken) return;
		const claims = this._tokensService.getClaimsFromJWT(accessToken);
		this.setUserData(claims);
	}
}
